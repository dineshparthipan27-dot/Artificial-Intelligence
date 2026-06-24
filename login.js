const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

function showLoginForm() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
}

function showSignupForm() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
}

loginBtn.addEventListener("click", showLoginForm);
signupBtn.addEventListener("click", showSignupForm);
showSignup.addEventListener("click", showSignupForm);
showLogin.addEventListener("click", showLoginForm);

document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
            icon.style.color = "var(--primary-color)";
            icon.style.textShadow = "0 0 8px var(--primary-glow)";
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
            icon.style.color = "var(--text-muted)";
            icon.style.textShadow = "none";
        }
    });
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.classList.add("show");
    errorElement.previousElementSibling.style.borderColor = "var(--error)";
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = "";
    errorElement.classList.remove("show");
    if (errorElement.previousElementSibling) {
        errorElement.previousElementSibling.style.borderColor = "rgba(0, 240, 255, 0.2)";
    }
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const role = document.getElementById("loginRole").value;

    if (!emailPattern.test(email)) {
        showError("loginEmailError", "Invalid node address (email).");
        isValid = false;
    } else {
        clearError("loginEmailError");
    }

    if (password.length < 6) {
        showError("loginPasswordError", "Decryption key must be at least 6 characters.");
        isValid = false;
    } else {
        clearError("loginPasswordError");
    }

    if (isValid) {
        localStorage.setItem("UserMail", email);

        const btn = loginForm.querySelector('.main-btn');
        btn.innerText = "Processing...";

        setTimeout(() => {
            if (role === "admin") {
                window.location.href = "admin.html";
            } else if (role === "user") {
                window.location.href = "user.html";
            } else {
                window.location.href = "index.html";
            }
        }, 500);
    }
});

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();
    const role = document.getElementById("signupRole").value;

    if (name === "") {
        showError("signupNameError", "Entity designation is required.");
        isValid = false;
    } else { clearError("signupNameError"); }

    if (!emailPattern.test(email)) {
        showError("signupEmailError", "Invalid node address (email).");
        isValid = false;
    } else { clearError("signupEmailError"); }

    if (password.length < 6) {
        showError("signupPasswordError", "Decryption key must be at least 6 characters.");
        isValid = false;
    } else { clearError("signupPasswordError"); }

    if (password !== confirmPassword || confirmPassword === "") {
        showError("signupConfirmError", "Decryption keys do not match.");
        isValid = false;
    } else { clearError("signupConfirmError"); }

    if (isValid) {
        const btn = signupForm.querySelector('.main-btn');
        btn.innerText = "Generating Pass...";

        setTimeout(() => {
            alert("Node registered successfully. You may now authenticate.");
            showLoginForm();
            btn.innerText = "Generate Pass";
            signupForm.reset();
        }, 500);
    }
});