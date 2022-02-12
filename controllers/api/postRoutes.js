const router = require("express").Router();
const { Post } = require("../../models");

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

router.delete("/:id", async (req, res) => {
  // try {
  //   const projectData = await Project.destroy({
  //     where: {
  //       id: req.params.id,
  //       user_id: req.session.user_id,
  //     },
  //   });
  //   if (!projectData) {
  //     res.status(404).json({ message: 'No project found with this id!' });
  //     return;
  //   }
  //   res.status(200).json(projectData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
