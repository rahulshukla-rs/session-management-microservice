const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const store = require("../../config/session");
const User = require("../models/User");

exports.register = async (req, res) => {

    try {
        /* validation */
        if (req.body.username == "" || req.body.username === undefined) {
            return res.status(400).json({ message: "Please provide username" });
        }
        if (req.body.password == "" || req.body.password === undefined) {
            return res.status(400).json({ message: "Please provide password" });
        }

        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ message: "Username already exists." });
        }
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password,
            status: 1,
            maxActiveSession: 1
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.status(200).json({
                        message: "User Created.",
                        data: user
                    }))
                    .catch(err => res.status(400).json({ message: err.toString() }));
            });
        });
    } catch (error) {
        return res.status(400).json({ message: error.toString() })
    }
};

exports.login = async (req, res) => {
    try {
        /* Validation */
        if (req.session.username && req.session.username != undefined) {
            return res.status(200).json({ token: req.session.token });
        }
        if (req.body.username == "" || req.body.username === undefined) {
            return res.status(400).json({ message: "Please provide username" });
        }
        if (req.body.password == "" || req.body.password === undefined) {
            return res.status(400).json({ message: "Please provide password" });
        }

        const user = await User.find({ "username": req.body.username })
        if (user.length < 1) {
            return res.status(400).json({ message: "Invalid User." });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Incorrect Password." });
            }
            if (result == false) {
                return res.status(400).json({ message: "Incorrect Password." });
            }
            if (user[0].status === 0) {
                return res.status(401).json({ message: "Account Locked." });
            }
            if (result) {

                /* Check active session count */
                store.all(async function (err, session) {
                    if (err) {
                        return res.status(400).json({ message: err.toString() })
                    }

                    let sameUsernameArr = await session.filter((usernameArr) => usernameArr.session.username == user[0].username);

                    if (sameUsernameArr.length >= user[0].maxActiveSession) {
                        return res.status(401).json({ message: "Currently you have max number of active connections" });
                    }
                    else {
                        let token = uuidv4();
                        req.session.username = user[0].username;
                        req.session.token = token;
                        return res.status(200).json({ token });
                    }
                })
            }
        })
    } catch (error) {
        return res.status(400).json({ message: error.toString() })
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            return res.status(200).json({ message: "Logout Success!" });
        });
    } catch (error) {
        return res.status(400).json({ message: error.toString() })
    }
};

exports.sessionCheck = async (req, res) => {
    try {
        if (req.session.token === req.query.token) {
            return res.status(200).json({});
        }
        return res.status(401).json({});

    } catch (error) {
        return res.status(400).json({ message: error.toString() })
    }
};