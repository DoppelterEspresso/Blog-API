const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

exports.user_create = function (req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
        res.json({ message: "Passwords don't match"})
        return
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err)
        }
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })
        user.save((err) => {
            if (err) {
                return next(err)
            }
            res.json({ message: "User created"})
        })
    })
}