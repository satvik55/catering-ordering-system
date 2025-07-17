import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const logAction = (action, data) => {
    console.log(`Action: ${action}`, data);
};

// --- THIS IS THE FIX ---
// After a successful login, this function decides where to redirect the user.
const handleLoginRedirect = (user) => {
    // Check if the logged-in user's email is our designated admin email.
    if (user.email === 'admin@catering.com') {
        logAction("Admin Login Detected", { email: user.email });
        // Redirect to the admin dashboard.
        window.location.href = '/admin/dashboard.html';
    } else {
        logAction("User Login Detected", { email: user.email });
        // Redirect to the regular user menu.
        window.location.href = '/index.html';
    }
};

const handleAuthForm = (formId, authFunction) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        
        authFunction(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                logAction(formId, { uid: user.uid, email: user.email });
                
                // If this was a login, decide where to redirect.
                if (formId === 'login-form') {
                    handleLoginRedirect(user);
                } else {
                    // For registration, always go to the main menu first.
                    window.location.href = '/index.html';
                }
            })
            .catch((error) => {
                logAction(`${formId} Error`, { code: error.code, message: error.message });
                alert(error.message);
            });
    });
};

handleAuthForm('login-form', signInWithEmailAndPassword);
handleAuthForm('register-form', createUserWithEmailAndPassword);
