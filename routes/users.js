var express = require('express');
var router = express.Router();
var passport = require("passport");
const userController = require("../controllers/userController")
var jwt = require("jsonwebtoken")
require("dotenv").config();

// POST login
router.post("/", 
    passport.authenticate("local"),
    function(req, res) {
        jwt.sign({ user: req.user}, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
            res.json({token})
        })
    })
module.exports = router;
