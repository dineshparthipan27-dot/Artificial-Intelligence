
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});


document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');

newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailValue = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailValue === '') {
        showError('Please enter your email address.');
    }

    else if (!emailPattern.test(emailValue)) {
        showError('Invalid format. Please enter a valid email.');
    }

    else {
        showSuccess('Successfully subscribed to updates!');
        window.location.href = ('404.html')
        emailInput.value = '';
    }
});


function showError(message) {
    formMessage.textContent = message;
    formMessage.className = 'form-message msg-error';

    newsletterForm.classList.remove('success-border');
    newsletterForm.classList.add('error-border');
}


function showSuccess(message) {
    formMessage.textContent = message;
    formMessage.className = 'form-message msg-success';

    newsletterForm.classList.remove('error-border');
    newsletterForm.classList.add('success-border');

    setTimeout(() => {
        formMessage.textContent = '';
        newsletterForm.classList.remove('success-border');
    }, 4000);
}