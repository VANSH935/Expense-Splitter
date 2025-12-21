// ========================
//     PAGE ANIMATION
// ========================
const container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');

signUpBtn.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInBtn.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// ========================
//          SIGNUP
// ========================
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("signupUsername").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    let user = { username, email, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful! Please Login.");

    container.classList.remove("right-panel-active");
});

// ========================
//          LOGIN
// ========================
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No user found. Please Sign Up first.");
        return;
    }

    if (username === savedUser.username && password === savedUser.password) {

        localStorage.setItem("loggedIn", "true");

        // Correct redirect based on your folder structure
        window.location.href = "./dashboard.html";

    } else {
        alert("Invalid username or password!");
    }
});
