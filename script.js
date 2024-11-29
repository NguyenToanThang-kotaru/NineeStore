// script.js

// Giả lập dữ liệu sản phẩm
const products = [
    { id: 1, name: "Sản phẩm 1", price: 100000 },
    { id: 2, name: "Sản phẩm 2", price: 200000 },
];

let cart = [];

// Thêm sản phẩm vào giỏ
function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Xóa sản phẩm khỏi giỏ
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
}

// Cập nhật giỏ hàng
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div>
                <p>${item.name} - ${item.price} VNĐ x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
            </div>
        `;
    });

    totalPrice.textContent = total;
}

// Hiển thị thông tin thanh toán
document.getElementById("checkout-btn").addEventListener("click", () => {
    document.getElementById("cart").classList.add("hidden");
    document.getElementById("checkout").classList.remove("hidden");
});

// Xử lý thanh toán qua thẻ
document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
    input.addEventListener("change", (e) => {
        if (e.target.value === "card") {
            document.getElementById("card-details").classList.remove("hidden");
        } else {
            document.getElementById("card-details").classList.add("hidden");
        }
    });
});

// Xác nhận đơn hàng
document.getElementById("confirm-btn").addEventListener("click", () => {
    const orderSummary = document.getElementById("order-summary");
    const address = document.getElementById("address").value || document.getElementById("new-address").value;

    let paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    if (paymentMethod === "card") {
        paymentMethod = "Thanh toán bằng thẻ tín dụng";
    } else if (paymentMethod === "bank") {
        paymentMethod = "Chuyển khoản";
    } else {
        paymentMethod = "Tiền mặt";
    }

    orderSummary.innerHTML = `
        <p><strong>Địa chỉ:</strong> ${address}</p>
        <p><strong>Phương thức thanh toán:</strong> ${paymentMethod}</p>
        <h3>Sản phẩm:</h3>
        ${cart
            .map(
                (item) =>
                    `<p>${item.name} - ${item.price} VNĐ x ${item.quantity}</p>`
            )
            .join("")}
    `;

    document.getElementById("checkout").classList.add("hidden");
    document.getElementById("summary").classList.remove("hidden");
});

// Khởi tạo
addToCart(products[0]);
addToCart(products[1]);