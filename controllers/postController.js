const Post = require("../models/post");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.post_list = function (req, res, next) {
  Post.find({}).exec(function (err, posts) {
    if (err) {
      return next(err)
    }
    res.json(posts)
  })
};

exports.post_detail = function (req, res, next) {
  Post.findById(req.params.id).exec(function (err, post) {
    if (err) {
      return next(err)
    }
    res.json(post)
  })
};

exports.create_post = function (req, res, next) {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      var post = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: Date.now(),
        published: false,
      });
  
      post.save(function (err) {
        if (err) {
          return next(err);
        }
        res.json({
          message: "Post created",
          authData
        })
      })
    }
  })
};
