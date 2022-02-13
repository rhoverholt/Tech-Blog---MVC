const router = require("express").Router();
const { Post, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_name: req.session.user_nm,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        ...req.body,
      },
      { where: { id: req.params.id, user_name: req.session.user_nm } }
    );

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_name: req.session.user_nm,
      },
    });
    if (!postData) {
      res
        .status(404)
        .json({ message: "No project found with this id and user!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
