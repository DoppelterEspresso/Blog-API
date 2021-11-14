var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.post_list);

// GET specific post
router.get("/:id", postController.post_detail);

// POST new post
router.post("/", postController.create_post);

module.exports = router;
