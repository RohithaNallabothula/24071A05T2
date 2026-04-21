// ====== REGISTRATION ======
function registerUser() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value.trim();
    let phone = document.getElementById("regPhone").value.trim();
    let address = document.getElementById("regAddress").value.trim();

    if (!name || !email || !username || !password || !phone || !address) {
        alert("All fields are required!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    let user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful! Please Login.");
    window.location.href = "login.html";
}

// ====== LOGIN ======
function loginUser() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Enter Username and Password!");
        return;
    }

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No registered user found!");
        return;
    }

    if (username === storedUser.username && password === storedUser.password) {
        alert("Login Successful!");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "catalog.html";
    } else {
        alert("Invalid Credentials!");
    }
}

// ====== ADD TO CART (Login Required) ======
function addToCart(productName, price) {
    let loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
        alert("Please login to add items to cart!");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.name === productName);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, price: price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}

// ====== LOAD CART ======
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartBody = document.getElementById("cartBody");

    if (cart.length === 0) {
        cartBody.innerHTML = "<h5 class='text-center'>Cart is Empty</h5>";
        return;
    }

    let html = `
        <table class="table table-bordered text-center">
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
    `;

    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    });

    html += `
        <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>₹${total}</strong></td>
        </tr>
        </table>
        <button class="btn btn-success w-100" onclick="checkout()">Checkout</button>
    `;

    cartBody.innerHTML = html;
}

// ====== CHECKOUT ======
function checkout() {
    alert("Checkout successful! Thank you for shopping.");
    localStorage.removeItem("cart");
    loadCart();
}
