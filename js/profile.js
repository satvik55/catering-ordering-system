import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const userEmailSpan = document.getElementById('user-email');
const logoutButton = document.getElementById('profile-logout-btn');

onAuthStateChanged(auth, user => {
    if (user) {
        userEmailSpan.textContent = user.email;
    } else {
        window.location.href = '/auth/login.html';
    }
});

logoutButton.addEventListener('click', () => {
    signOut(auth).catch((error) => {
        console.error("Logout Error", error);
    });
});