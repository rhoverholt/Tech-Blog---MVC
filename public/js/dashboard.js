const clickCreatePost = () => {
  window.location.href = "./dashboard/new-post";
};

document
  .getElementById("new-post-btn")
  .addEventListener("click", clickCreatePost);
