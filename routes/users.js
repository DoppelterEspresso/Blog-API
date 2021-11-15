var express = require('express');
var router = express.Router();
var passport = require("passport");
const userController = require("../controllers/userController")

// POST login
router.post("/", 
    passport.authenticate("local"),
    function(req, res) {
        res.redirect(req.body.adminUrl + "panel")
    })
module.exports = router;
