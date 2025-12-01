const form = document.getElementById("signupForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let verify = document.getElementById("verify");

    const errors = document.querySelectorAll(".error");
    errors.forEach(err => err.textContent = "");

    if (fullname.value.trim() === "") {
        fullname.nextElementSibling.textContent = "Name is required.";
        valid = false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)) {
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
        alert("🥳 Account Created Successfully!");
        form.reset();
    }
});
