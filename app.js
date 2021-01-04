/* require npm package */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');

/* require config and routes */
const config = require("./config/server");
const store = require("./config/session");


/* Object Created */
const app = express();

/* loading routes. */
const userRoutes = require("./api/routes/User");

/* Handel POST Request */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Session */
app.use(session({
    secret: config.SESSION_KEY,
    store: store,
    saveUninitialized: false,
    resave: false
}));

/* Routes */
app.all("/", (req, res) => {
    let username = "Guest";
    if(req.session.username) username = req.session.username;
    res.status(200).json({
        status: true,
        message: "Welcome to Session Management Microservice API "+username
    })
})
app.use("/user", userRoutes);


/* No Route Found Start */
app.use((req, res, next) => {
    const error = new Error("NO Route Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});
/* No Route Found End */

/* Server Start */
app.listen(config.SERVER_PORT, () =>
    console.log(`server running on port ${config.SERVER_PORT}`)
);

/* Connect To MongoDB */
mongoose.connect(
    config.mongodb.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, db) => {
        if (err) throw err;
        console.log(`MongoDB connected on port ${config.mongodb.MONGO_PORT}`);
    }
);
mongoose.Promise = global.Promise;