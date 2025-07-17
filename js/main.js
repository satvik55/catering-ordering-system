import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const productList = document.getElementById('product-list');
const logoutButton = document.getElementById('logout-btn');
const cartButton = document.getElementById('cart-btn');

const logAction = (action, data) => {
    console.log(`Action: ${action}`, data);
};

onAuthStateChanged(auth, user => {
    if (user) {
        logAction("User Authenticated", { uid: user.uid });
        fetchProducts();
    } else {
        logAction("User Not Authenticated", {});
        window.location.href = '/auth/login.html';
    }
});

logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        logAction("User Logged Out", {});
    }).catch((error) => {
        logAction("Logout Error", { code: error.code, message: error.message });
    });
});

cartButton.addEventListener('click', () => {
    window.location.href = '/cart.html';
});

const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        logAction("Fetching Products", { count: querySnapshot.size });
        if (querySnapshot.empty) {
            productList.innerHTML = "<p>No products available at the moment.</p>";
            return;
        }
        let html = '';
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productId = doc.id;
            html += `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <button class="primary-btn add-to-cart-btn" data-id="${productId}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                </div>
            `;
        });
        productList.innerHTML = html;
        addCartListeners();
    } catch (error) {
        logAction("Fetch Products Error", { code: error.code, message: error.message });
    }
};

const addCartListeners = () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            
            const cartItem = { id, name, price, quantity: 1 };
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(cartItem);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            logAction("Add to Cart", cartItem);
            
            e.target.textContent = "Added!";
            setTimeout(() => {
                e.target.textContent = "Add to Cart";
            }, 1000);
        });
    });
};