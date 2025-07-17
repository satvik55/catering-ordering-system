import { auth, db } from '../js/firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const allOrdersContainer = document.getElementById('all-orders-container');

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

onAuthStateChanged(auth, user => {
    if (user) {
        fetchAllOrders();
    } else {
        logAction("Admin not logged in", {});
        window.location.href = '/auth/login.html';
    }
});

const fetchAllOrders = async () => {
    logAction("Fetching all orders for admin", {});
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        if (querySnapshot.empty) {
            allOrdersContainer.innerHTML = '<p style="text-align: center;">There are no orders yet.</p>';
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
                        <p>User ID: ${order.userId}</p>
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
        allOrdersContainer.innerHTML = html;

    } catch (error) {
        logAction("Fetch All Orders Error", { code: error.code, message: error.message });
        allOrdersContainer.innerHTML = '<p style="text-align: center; color: red;">Could not fetch orders.</p>';
    }
};
