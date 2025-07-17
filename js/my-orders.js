import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const ordersListContainer = document.getElementById('orders-list-container');

const logAction = (action, data) => {
    console.log(`Action: ${action}`, data);
};

onAuthStateChanged(auth, user => {
    if (user) {
        fetchUserOrders(user.uid);
    } else {
        logAction("User not logged in", {});
        window.location.href = '/auth/login.html';
    }
});

const fetchUserOrders = async (userId) => {
    logAction("Fetching orders for user", { userId });
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            ordersListContainer.innerHTML = '<p style="text-align: center;">You have not placed any orders yet.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach(doc => {
            const order = doc.data();
            const orderDate = order.orderDate.toDate().toLocaleDateString();
            
            let itemsHtml = '<ul class="order-items-list">';
            order.items.forEach(item => {
                itemsHtml += `<li>${item.name} (x${item.quantity})</li>`;
            });
            itemsHtml += '</ul>';

            html += `
                <div class="order-card">
                    <div class="order-header">
                        <h3>Order Date: ${orderDate}</h3>
                        <p>Status: <span class="status">${order.status}</span></p>
                    </div>
                    <div class="order-body">
                        ${itemsHtml}
                    </div>
                    <div class="order-footer">
                        <h4>Total: $${order.totalAmount.toFixed(2)}</h4>
                    </div>
                </div>
            `;
        });
        ordersListContainer.innerHTML = html;

    } catch (error) {
        logAction("Fetch Orders Error", { code: error.code, message: error.message });
        ordersListContainer.innerHTML = '<p style="text-align: center; color: red;">Could not fetch orders.</p>';
    }
};