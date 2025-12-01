const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const verify = document.getElementById("verify");

    const errors = document.querySelectorAll(".error");
    errors.forEach(e => e.textContent = "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.nextElementSibling.textContent = "Enter a valid email.";
        valid = false;
    }

    if (password.value.length < 6) {
        password.nextElementSibling.textContent = "Minimum 6 characters required.";
        valid = false;
    }

    if (!verify.checked) {
        document.querySelector(".checkbox + .error").textContent = "Please verify.";
        valid = false;
    }

    if (valid) {
        form.reset();
        alert("🎉 Login Successful! Welcome back.");
    }
});
