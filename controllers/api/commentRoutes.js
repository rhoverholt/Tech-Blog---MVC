const router = require("express").Router();
const { Comment } = require("../../models");

// /api/comment
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.text && req.body.post_id) {
      const newComment = await Comment.create({
        text: req.body.text,
        post_id: req.body.post_id,
        user_name: req.session.user_nm,
      });
      res.status(200).json(newComment);
    } else {
      res.status(400).json("text and postId information is required");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
