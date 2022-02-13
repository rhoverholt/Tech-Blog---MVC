const router = require("express").Router();
const { Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    for (post of posts) {
      let month = post.date_created.getMonth() + 1;
      let date = post.date_created.getDate();
      let year = post.date_created.getFullYear();
      post.date_created = month + "/" + date + "/" + year;
    }

    console.log(req.session.logged_in);

    res.render("homepage", {
      isHomepage: true,
      posts,
      logged_in: req.session.logged_in,
      isEmpty: !posts[0],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [{ model: Comment }],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      let month = post.date_created.getMonth() + 1;
      let date = post.date_created.getDate();
      let year = post.date_created.getFullYear();
      post.date_created = month + "/" + date + "/" + year;

      for (comment of post.comments) {
        let month = comment.date_created.getMonth() + 1;
        let day = comment.date_created.getDay();
        let year = comment.date_created.getFullYear();
        comment.date_created = month + "/" + day + "/" + year;
      }

      post.isNotLink = true;
      res.render("post-detail", {
        isPostDetail: true,
        isOwner: req.session.user_nm == post.user_name,
        post,
        name: req.session.user_nm,
      });
    } else {
      res.status(406).json(`Post ID #${req.params.id} does not exist`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login", { isLogin: true });
});

router.get("/login/new-user", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("newusersignup", { isNewUserSignup: true });
});

router.get("/dashboard", withAuth, async (req, res) => {
  if (!req.session.user_nm) {
    console.log("LOGGED IN WITH NO NAME?!");
    res.redirect("/");
  }

  try {
    const postData = await Post.findAll({
      where: { user_name: req.session.user_nm },
    });

    let posts = postData.map((post) => post.get({ plain: true }));

    for (post of posts) {
      let month = post.date_created.getMonth() + 1;
      let date = post.date_created.getDate();
      let year = post.date_created.getFullYear();
      post.date_created = month + "/" + date + "/" + year;
    }

    res.render("dashboard", {
      isDashboard: true,
      posts,
      logged_in: req.session.logged_in,
      name: req.session.user_nm,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard/new-post", withAuth, async (req, res) => {
  res.render("newpost", {
    isNewPost: true,
    logged_in: req.session.logged_in,
    name: req.session.user_nm,
  });
});

module.exports = router;
