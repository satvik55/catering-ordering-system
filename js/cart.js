import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalSpan = document.getElementById('cart-total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentUser = null;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
        } else {
            currentUser = null;
        }
    });

    const logAction = (action, data) => {
        console.log(`Action: ${action}`, data);
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center;">Your cart is empty.</p>';
            cartTotalSpan.textContent = '0.00';
            placeOrderBtn.disabled = true;
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <span>$${itemTotal.toFixed(2)}</span>
                    <button class="nav-btn secondary remove-item-btn" data-index="${index}" style="margin-left: 1rem;">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalSpan.textContent = total.toFixed(2);
        placeOrderBtn.disabled = false;
        addRemoveListeners();
    };

    const addRemoveListeners = () => {
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                logAction("Remove from Cart", { itemIndex: index });
                renderCart();
            });
        });
    };

    placeOrderBtn.addEventListener('click', async () => {
        if (!currentUser) {
            alert("You must be logged in to place an order.");
            return;
        }
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const orderData = {
            userId: currentUser.uid,
            items: cart,
            totalAmount: parseFloat(cartTotalSpan.textContent),
            status: "Placed",
            orderDate: serverTimestamp()
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);
            logAction("Order Placed", { orderId: docRef.id });
            alert("Your order has been placed successfully!");
            
            localStorage.removeItem('cart');
            cart = [];
            renderCart();

        } catch (error) {
            logAction("Place Order Error", { code: error.code, message: error.message });
            alert("There was an error placing your order. Please try again.");
        }
    });

    renderCart();
});