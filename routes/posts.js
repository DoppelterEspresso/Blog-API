var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");
var commentController = require("../controllers/commentController");

// GET all posts
router.get("/", postController.post_list);

// GET specific post
router.get("/:postid", postController.post_detail);

// PUT update post
router.put("/:postid", verifyToken, postController.update_post)

// POST new post
router.post("/", verifyToken, postController.create_post);

// DELETE post
router.delete("/:postid", verifyToken, postController.delete_post);

// --- POST COMMENTS ---

// GET all comments under a specific post
router.get("/:postid/comments", commentController.comment_list);

// GET specific comment under a specific post
router.get("/:postid/comments/:commentid", commentController.comment_detail);

// POST new comment
router.post("/:postid/comments", commentController.create_comment);

// DELETE comment
router.delete("/:postid/comments/:commentid", verifyToken, commentController.delete_comment);

// VERIFY TOKEN
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = router;
