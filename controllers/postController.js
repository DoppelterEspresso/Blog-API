const Post = require("../models/post");
const Comment = require("../models/comment");

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
  var post = new Post({
    title: "API TEST",
    text: "PLACEHOLDER POST CREATED FOR TESTING",
    timestamp: Date.now(),
    published: false,
  });

  post.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
};
