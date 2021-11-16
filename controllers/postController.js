const Post = require("../models/post");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.post_list = function (req, res, next) {
  jwt.verify(req.headers["authorization"], process.env.SECRET, (err, authData) => {
    if (err) {
      Post.find({ published: true }).exec(function (err, posts) {
        if (err) {
          res.json({ message: "Something went wrong" })
          return;
        }
        res.json(posts)
        return
      })
    } else {
      Post.find({}).exec(function (err, posts) {
        if (err) {
          res.json({ message: "Something went wrong" })
          return;
        }
        res.json(posts)
        return
      })
    }
  })
};

exports.post_detail = function (req, res, next) {
  Post.findById(req.params.postid).exec(function (err, post) {
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
        res.json({ message: "Success" });
        return
      })
    }
  })
};

exports.delete_post = function (req, res, next) {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      res.json({ message: "Failure" });
    } else {
      Post.findByIdAndRemove(req.params.postid, function deletePost(err) {
        if (err) {
          res.json({ message: "Something went wrong", err: err });
          return;
        }
        res.json({ message: "Success" })
      })
    }
  })
}

exports.update_post = function (req, res, next) {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      res.json({ message: "Failure" });
    } else {
      Post.findById(req.params.postid).exec(function (err, post) {
        post.published = !post.published
        post.save()
        res.json({ message: "Success" })
      })
    }
  })
}