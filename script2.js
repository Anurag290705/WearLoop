document.addEventListener("DOMContentLoaded", function () {

  // ===== REGISTER FORM =====
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      alert("Registration Successful 🎉");
      this.reset();
    });
  }

  // ===== LOGIN FORM =====
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (email === "" || password === "") {
        alert("Please fill all fields!");
        return;
      }

      alert("Login Successful 🎉");
      this.reset();
    });
  }

  // ===== BACKGROUND ICONS =====
  const icons = ["❤️","🎁","👟","🤝","🧢","📦","👜","🙏","👕","♻️"];
  const bg = document.getElementById("bgIcons");

  if (bg) {
    for (let i = 0; i < 25; i++) {
      const span = document.createElement("span");
      span.innerText = icons[Math.floor(Math.random() * icons.length)];

      span.style.left = Math.random() * 100 + "vw";
      span.style.animationDuration = (5 + Math.random() * 10) + "s";
      span.style.fontSize = (20 + Math.random() * 30) + "px";

      bg.appendChild(span);
    }
  }

});
