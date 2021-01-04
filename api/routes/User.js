const express = require("express");
const router = express.Router();

const UserController = require("../controllers/User");
const checkAuth = require('../middleware/check-auth');


/* 
Name: Register
Method: POST
Des: Register new user
Route: Public
*/
router.post("/register", UserController.register);

/* 
Name: Login
Method: POST
Des: Login User
Route: Public
*/
router.post("/login", UserController.login);

/* 
Name: Logout
Method: POST
Des: Logout User
Route: Private
*/
router.post("/logout", checkAuth, UserController.logout);

/* 
Name: SessionCheck
Method: GET
Des: Check Session active or not
Route: Private
*/
router.get("/sessionCheck", UserController.sessionCheck);



module.exports = router;
