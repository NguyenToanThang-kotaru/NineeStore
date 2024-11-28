function up() {
  let input = document.getElementById("count");
  input.value = Number(input.value) + 1;

  let buy = Number(document.getElementById("buy").innerHTML);

  let sum = Number(document.getElementById("sum").innerHTML);
  document.getElementById("sum").innerHTML = buy * input.value;
}
function down() {
  let input = document.getElementById("count");
  input.value = Number(input.value) - 1;

  let buy = Number(document.getElementById("buy").innerHTML);

  let sum = Number(document.getElementById("sum").innerHTML);
  document.getElementById("sum").innerHTML = sum - buy;
  if (input.value == 0) {
    confirm("Are you sure want to delete of the data?");
  }
}
function xoa() {
  confirm("Are you sure want to delete of the data?");
  let sum = Number(document.getElementById("sum").innerHTML);
  document.getElementById("sum").innerHTML = 0;
  let input = document.getElementById("count");
  input.value = 0;
}

function check() {
  const cha = document.getElementById("cha");
  const con = document.getElementById("con");
  cha.addEventListener("change", function () {
    con.checked = cha.checked;
  });
}

function chuyenDanhSachItemGiaHangSangHTML(danhSachitemGioHang) {
  var htmlTong = "";
  for (var i = 0; i < danhSachitemGioHang.length; i++)
    htmlTong =
      htmlTong + chuyenDoiTuongItemGiaHangSangHTML(danhSachitemGioHang[i]);
  return htmlTong;
}
function hienThiDanhSachItemGiaHangSangHTML() {
  var danhSachItemGiaHang = layGioHangTuLocalStorage();

  var HTML = chuyenDanhSachItemGiaHangSangHTML();

  var nodeGioHang = document.getElementById("gio-hang");
}
function mua() {
  confirm(" ");
}
let productInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productInCart));
}
function renderProducts() {
  let data = ``;
  products.map((value) => {
    data += `
         <tbody>
    <tr>
        <td><input type="checkbox" id="con"></td>
        <td>ảnh<br>Thông tin</td>
        <td id="buy">10000</td>
        <td>
            <div class="quantity-control">
                <button onclick="down()">-</button>
                <input type="text" value="1" id="count">
                <button onclick="up()">+</button>
            </div>
        </td>
        <td id="sum">10000</td>
        <td><button class="delete-btn" onclick="xoa()" >Xóa</button></td>
    </tr>
</tbody>
      `;
  });
  document.getElementById("products").innerHTML = data;
}
// Thêm vào giỏ hàng
function addToCart(cartElement) {
  const orders = document.querySelectorAll(
    ".cart-table tbody .order-product-id"
  );
  const productItem = cartElement.parentElement.parentElement;
  const productID = productItem.id;
  const productImg = productItem.querySelector(".product-img").src;
  const productName = productItem.querySelector(".product-name").innerText;
  const productPrice = productItem.querySelector(".product-price").innerText;
  const productQuantity = productItem.querySelector(
    ".detail-quantity-value"
  ).innerText;
  const productStorage = productItem.querySelector('.product-quantity-value').innerText
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].innerText == productID) {
      alert("Sản phẩm này đã có trong giỏ hàng");
      return;
    }
  }
  const addtr = document.createElement("tr");
  const trcontent = `
      <tr>
        <td><input type="checkbox" id="myCheckbox" class="item-checkbox" onchange="cartTotal()"></td>
        <td class="order-product-id">${productID}</td>
        <td class="order-product-name">${productName}</td>
        <td><img width='100' src='${productImg}' class="order-img"></td>
        <td><span class="order-price">${productPrice}</span><sup>₫</sup></td>
        <td>
                          <div class="detail-quantity">
                              <i class="fa-solid fa-circle-minus desc-quantity" onclick="decreaseQuantity(this); cartTotal()"></i>
                              <div class="detail-quantity-value order-quantity">${productQuantity}</div>
                              <i class="fa-solid fa-circle-plus plus-quantity" onclick="increaseQuantity(this, ${productStorage}); cartTotal()" ></i>
                          </div>
        </td>
        <td><button onclick='deleteCart(this)' class='btn btn-danger delete-btn'>Xóa</button></td>
      </tr>
    `;
  addtr.innerHTML = trcontent;
  const cartTable = document.querySelector(".cart-table tbody");
  cartTable.append(addtr);
  checkCartEmpty();
  displayTotalQuantityCart();
}

//Kiểm tra ở checkbox tất cả có được click hay không
function momCheckBox(masterCheckbox) {
  const checkboxes = document.querySelectorAll(".item-checkbox");
  checkboxes.forEach((checkbox) => (checkbox.checked = masterCheckbox.checked));
  if (masterCheckbox.checked) {
    productInCart.forEach((item) => {
      item.check = "checked";
    });
    // const product = productInCart[index];
  }
  if (!masterCheckbox.checked) {
    productInCart.forEach((item) => {
      item.check = "";
    });
  }
  cartTotal();
}
// Tính tổng tiền
function cartTotal() {
  const checkboxes = document.querySelectorAll(".item-checkbox");
  let cartListChecked = [];
  checkboxes.forEach((checkbox) => {
    //kiểm tra tất cả checkbox có được check hay khôn
    checkAllCheckbox();
    //Kiểm tra nếu checkbox được check thì thêm vào mảng
    if (checkbox.checked)
      cartListChecked.push(checkbox.parentElement.parentElement);
  });
  let totalPrice = 0;
  for (let i = 0; i < cartListChecked.length; i++) {
    const quantityValue = Number(
      cartListChecked[i].querySelector(".order-quantity").innerText
    );
    const orderPrice = Number(
      cartListChecked[i]
        .querySelector(".order-price")
        .innerText.replace(/\./g, "")
    );
    totalPrice = totalPrice + orderPrice * quantityValue;
  }

  document.querySelector(".cart-table tfoot span").innerText =
    totalPrice.toLocaleString("de-DE");
  checkCartEmpty();
  changeQuantity();
  displayTotalQuantityCart();
}
//Lắng nghe sự kiện ô số lượng thay đổi thì tính tiền lại
function changeQuantity() {
  const inputs = document.querySelectorAll(".order-quantity");
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      cartTotal();
    });
  });
}
// Xóa đơn hàng
function deleteCart(deleteElement) {
  deleteElement.parentElement.parentElement.remove();
  cartTotal();
  checkCartEmpty();
}
// Kiểm tra giỏ hàng có rỗng không
function checkCartEmpty() {
  const cartTable = document.querySelector(".cart-table");
  const cartEmpty = document.querySelector(".cart-empty");
  const submitOrder = document.querySelector(".submit-order");
  var cartLists = document.querySelectorAll(".cart-box tbody tr") || [];
  if (cartLists.length == 0) {
    cartTable.style.display = "none";
    submitOrder.style.display = "none";
    cartEmpty.style.display = "block";
  } else {
    cartTable.style.display = "block";
    submitOrder.style.display = "block";
    cartEmpty.style.display = "none";
  }
}
checkCartEmpty();
// Kiểm tra tất cả ô checkbox có được check không
function checkAllCheckbox() {
  //Đặt cờ kiểm tra xem có thằng nào checked hay không
  let flag = 0;
  const checkboxMom = document.querySelector(".mom-checkbox");
  const checkboxes = document.querySelectorAll(".item-checkbox");
  checkboxes.forEach((checkbox) => {
    //Nếu có 1 thằng không checked thì flag = 1
    if (!checkbox.checked) flag = 1;
  });
  if (flag == 0) checkboxMom.checked = true;
  else checkboxMom.checked = false;
}

//Hiển thị số trên giỏ hàng
function displayTotalQuantityCart() {
  const cartList = document.querySelectorAll(".cart-box tbody tr");
  const quantityCart = document.querySelector(".total-quantity-cart");
  let totalQuantity = 0;
  if (cartList.length > 0) {
    for (var i = 0; i < cartList.length; i++) {
      var quantityValue = Number(
        cartList[i].querySelector(".order-quantity").innerText
      );
      totalQuantity = totalQuantity + quantityValue;
    }
    if (totalQuantity != 0) {
      if (totalQuantity > 0) quantityCart.innerText = totalQuantity;
      else quantityCart.innerText = "";
    }
  } else quantityCart.innerText = "";
}

// Nút mua
function submitOrder() {
  const checkboxes = document.querySelectorAll(".item-checkbox");
  let cartListChecked = [];
  checkboxes.forEach((checkbox) => {
    //kiểm tra tất cả checkbox có được check hay khôn
    checkAllCheckbox();
    //Kiểm tra nếu checkbox được check thì thêm vào mảng
    if (checkbox.checked)
      cartListChecked.push(checkbox.parentElement.parentElement);
  });
  //Kiểm tra xem nếu không checkbox nào được check thì báo
  let productList = [];
  if (cartListChecked.length > 0) {
    cartListChecked.forEach((cart) => {
      product = {
        ID: cart.querySelector(".order-product-id").innerText,
        Name: cart.querySelector(".order-product-name").innerText,
        Quantity: cart.querySelector(".order-quantity").innerText,
        Price: cart.querySelector(".order-price").innerText,
        Img: cart.querySelector(".order-img").src,
      };
      productList.push(product);
    });
    displayPayment(productList, cartListChecked);
  } else {
    alert("Vui lòng chọn ít nhất một sản phẩm để mua");
  }
}
