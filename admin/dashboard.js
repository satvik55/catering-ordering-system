import { auth, db } from '../js/firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const logAction = (action, data) => {
    console.log(`Action: ${action}`, data);
};

// --- LOGOUT LOGIC ADDED ---
const logoutButton = document.getElementById('admin-logout-btn');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        logAction("Admin Logged Out", {});
        window.location.href = '/auth/login.html';
    }).catch((error) => {
        logAction("Logout Error", { code: error.code, message: error.message });
    });
});
// --- END OF LOGOUT LOGIC ---

const uploadForm = document.getElementById('upload-product-form');
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = uploadForm['product-name'].value;
    const description = uploadForm['product-desc'].value;
    const price = Number(uploadForm['product-price'].value);

    try {
        const docRef = await addDoc(collection(db, "products"), {
            name: name,
            description: description,
            price: price
        });
        logAction('Product Uploaded', { id: docRef.id });
        uploadForm.reset();
        alert('Product uploaded successfully!');
    } catch (error) {
        logAction('Upload Error', { code: error.code, message: error.message });
        console.error("Error adding document: ", error);
    }
});
