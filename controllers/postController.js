const Post = require("../models/post");

exports.post_list = function (req, res, next) {
  let testObject = { title: "Test Post", text: "Hello There!" };
  res.json(testObject);
};

exports.post_detail = function (req, res, next) {
  res.json({ title: "Specific Post", id: req.params.id });
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
