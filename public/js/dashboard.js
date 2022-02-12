const clickCreatePost = () => {
  window.location.href = "./dashboard/new-post";
};

document
  .querySelector(".new-post-btn")
  .addEventListener("click", clickCreatePost);
