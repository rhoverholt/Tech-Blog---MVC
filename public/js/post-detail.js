const addCommentHandler = () => {
  document.getElementById("new-comment-form").style.display = "block";
  document.getElementById("add-comment").disabled = true;
};

const postCommentHandler = async (event) => {
  event.preventDefault();

  const commentEl = document.getElementById("new-comment-area");

  const post_id = document.getElementsByClassName("card")[0].dataset.postId;

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ text: commentEl.value, post_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Server was unable to process your new comment");
  }
};

const showUpdatePostHandler = async (event) => {
  event.preventDefault();

  document.getElementById("update-show").disabled = true;
  document.getElementById("delete-post").disabled = true;
  document.getElementById("update-div").style.display = "block";
};

const deletePostHandler = async (event) => {
  event.preventDefault();

  const post_id = document.getElementsByClassName("card")[0].dataset.postId;

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.href = "./../dashboard";
  } else {
    alert("Delete failed");
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();

  const post_id = document.getElementsByClassName("card")[0].dataset.postId;

  const title = document.getElementById("update-post-title").value.trim();
  const text = document.getElementById("update-post-text").value.trim();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({ text, title }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) window.location.href = "./../dashboard";
  else alert("Update failed");
};

document
  .getElementById("add-comment")
  .addEventListener("click", addCommentHandler);

document
  .getElementById("post-new-comment")
  .addEventListener("click", postCommentHandler);

let showUpdateButtonEl = document.getElementById("update-show");

if (showUpdateButtonEl)
  showUpdateButtonEl.addEventListener("click", showUpdatePostHandler);

let deleteButtonEl = document.getElementById("delete-post");

if (deleteButtonEl) deleteButtonEl.addEventListener("click", deletePostHandler);

let updateButtonEl = document.getElementById("update-post");

if (updateButtonEl) updateButtonEl.addEventListener("click", updatePostHandler);
