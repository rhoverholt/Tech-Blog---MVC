const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(req.session.logged_in);

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      isEmpty: !posts[0],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/login/new-user", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("newusersignup");
});

router.get("/dashboard/new-post", withAuth, async (req, res) => {
  res.render("newpost", {
    logged_in: req.session.logged_in,
    name: req.session.user_nm,
  });
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
      name: req.session.user_nm,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
