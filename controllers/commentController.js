const Post = require("../models/post");
const Comment = require("../models/comment");

exports.comment_list = function (req, res, next) {
  Comment.find({ post: req.params.postid}).exec(function (err, list_comments) {
    if (err) {
      return next(err)
    }
    if (list_comments === null) {
      var err = new Error("Comments not found");
      err.status = 404;
      return next(err);
    }
    res.json(list_comments);
  })
};

exports.comment_detail = function (req, res, next) {
  res.json({ comment_id: req.params.commentid, post_id: req.params.postid });
};

exports.create_comment = function (req, res, next) {
  Post.findById(req.params.postid).exec(function (err, post) {
    if (err) {
      return next(err);
    }
    if (post === null) {
      var err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }
    comment = new Comment({
      author: req.body.author,
      text: req.body.commentText,
      timestamp: Date.now(),
      post: post,
    });
    comment.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(req.body.postUrl);
    });
  });
};
