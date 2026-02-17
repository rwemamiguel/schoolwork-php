const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());

    axios.post("/auth/login", data)
      .then(() => {
        alert("Login successful");
        window.location.href = "/dashboard.html";
      })
      .catch(err => alert(err.response.data.error));
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(registerForm).entries());

    axios.post("/auth/register", data)
      .then(() => alert("Registered successfully"))
      .catch(err => alert(err.response.data.error));
  });
}
