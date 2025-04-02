// Routing Logic
const routes = {
    home: {
        title: "Welcome to ShopEase!",
        content: "Discover our amazing products and deals."
    },
    products: {
        title: "Our Products",
        content: "Check out the latest products we have in store."
    },
    cart: {
        title: "Your Cart",
        content: "Items you love are waiting in your cart!"
    },
    contact: {
        title: "Contact Us",
        content: "Reach out to us anytime for support."
    },
    signin: {
        title: "Sign In",
        content: "Log into your account to manage orders."
    },
    signup: {
        title: "Sign Up",
        content: "Create an account to start shopping!"
    }
};

// DOM Elements
const navLinks = document.querySelectorAll('[data-page]');
const contentDiv = document.getElementById('content');
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('nav-links');

// Navigation Function
function navigateTo(page) {
    const route = routes[page];
    if (route) {
        contentDiv.innerHTML = `<h1>${route.title}</h1><p>${route.content}</p>`;
    } else {
        contentDiv.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
}

// Event Listeners for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        navigateTo(page);
        // Close mobile menu after click
        navLinksContainer.classList.remove('active');
    });
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Initial Page Load

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const homePage = document.getElementById('home-page');
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showHomePage();
    }

    // Show Sign-Up Form by Default
    signupForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
    homePage.classList.add('hidden');

    // Toggle to Sign-In Form
    document.getElementById('to-signin').addEventListener('click', function () {
        signupForm.classList.add('hidden');
        signinForm.classList.remove('hidden');
    });

    // Toggle to Sign-Up Form
    document.getElementById('to-signup').addEventListener('click', function () {
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    // Sign-Up Functionality
    signupBtn.addEventListener('click', function () {
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (username && email && password) {
            // Save user info in localStorage
            localStorage.setItem('user', JSON.stringify({ username, email, password }));
            document.getElementById('signup-message').textContent = "Signup successful! Please sign in.";
            setTimeout(() => {
                signupForm.classList.add('hidden');
                signinForm.classList.remove('hidden');
            }, 1500);
        } else {
            document.getElementById('signup-message').textContent = "All fields are required.";
        }
    });

    // Sign-In Functionality
    signinBtn.addEventListener('click', function () {
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value.trim();
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && email === storedUser.email && password === storedUser.password) {
            localStorage.setItem('isLoggedIn', 'true');
            showHomePage();
        } else {
            document.getElementById('signin-message').textContent = "Invalid credentials.";
        }
    });

    // Logout Functionality
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    });

    // Function to Show Home Page
    function showHomePage() {
        signupForm.classList.add('hidden');
        signinForm.classList.add('hidden');
        homePage.classList.remove('hidden');
    }
});
