var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");

// GET all posts
router.get("/", postController.post_list);

// GET specific post
router.get("/:id", postController.post_detail);

// POST new post
router.post("/", postController.create_post);

// --- POST COMMENTS ---

// GET all comments under a specific post
router.get("/:postid/comments", commentController.comment_list);

// GET specific comment under a specific post
router.get("/:postid/comments/:commentid", commentController.comment_detail);

// POST new comment
router.post("/:postid/comments", commentController.create_comment);

module.exports = router;
