const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, }),
    //callback
    userController.login,
);

//router.get("/signup", userController.renderSignupForm);

//router.post("/signup", wrapAsync(userController.signup));


/* router.get("/login", userController.renderLoginForm);
 */

/* router.post("/login", savedRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, }),
    //callback
    userController.login,
); */

router.get("/logout", userController.logout);

module.exports = router; 