const loginFormHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector("#password-login").value.trim();
  const name = document.querySelector("#userName-login").value.trim();

  if (name && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector("#password-signup").value.trim();
  const name = document.querySelector("#userName-signup").value.trim();

  if (name && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      switch (response.status) {
        case 403:
          alert("User name already exists, try another");
          break;
        case 411:
          alert("Password must be 8 characters long");
          break;
        default:
          alert("Failed to log in");
      }
    }
  }
};

let loginEl = document.querySelector("#login-form");

if (loginEl) {
  loginEl.addEventListener("submit", loginFormHandler);
} else {
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
}
