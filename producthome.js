//------------------------- Detail ----------------------
// Hiển thị cửa sổ thông tin sản phẩm
function showDetail(detailElement) {
  detailElement.parentElement.parentElement.querySelector(
    ".overlay"
  ).style.display = "block";
}
// tăng giảm số lượng để đặt hàng trong thông tin
function decreaseQuantity(minusElement) {
  var detailQuantity = minusElement.parentElement.querySelector(
    ".detail-quantity-value"
  );
  var quantityValue = Number(detailQuantity.innerText);
  if (quantityValue > 1) {
    quantityValue--;
    detailQuantity.innerText = quantityValue;
  }
}
function increaseQuantity(plusElement, maxValue) {
  var detailQuantity = plusElement.parentElement.querySelector(
    ".detail-quantity-value"
  );
  var quantityValue = Number(detailQuantity.innerText);
  if (quantityValue < maxValue) {
    quantityValue++;
    detailQuantity.innerText = quantityValue;
  } else {
    alert("Không được nhập quá số lượng trong kho");
  }
}

//------------------------- Product ----------------------
//kiểm tra xem đã thêm danh sách có sẵn vào localStorage hay chưa
if (!localStorage.getItem("products")) {
  let products = [];
  //khởi tạo và duyệt tất cả sản phẩm
  const productListItem = document.querySelectorAll(".all-product-item");
  productListItem.forEach((item) => {
    //Lấy thông tin sản phẩm và lưu vào product
    const product = {
      ID: Math.round(Math.random() * 10000000000),
      Img: item.querySelector(".product-img").src,
      Name: item.querySelector(".product-name").innerText.trim(),
      Brand: item.querySelector(".product-brand").innerText.trim().trim(),
      Price: item.querySelector(".product-price").innerText.trim(),
      Quantity: item.querySelector(".product-quantity-value").innerText.trim(),
      // OriginalPrice: item.querySelector(
      //   ".product-original-price .original-price"
      // ).innerText.trim(),
      Detail: {
        Img: item.querySelector(".detail-img").src,
        CPU: item.querySelector(".CPU").innerText.trim(),
        Screen: item.querySelector(".screen").innerText.trim(),
        RAM: item.querySelector(".RAM").innerText.trim(),
        ROM: item.querySelector(".ROM").innerText.trim(),
        OS: item.querySelector(".OS").innerText.trim(),
        Card: item.querySelector(".card").innerText.trim(),
        Pin: item.querySelector(".pin").innerText.trim(),
        Network: item.querySelector(".network").innerText.trim(),
        Weight: item.querySelector(".weight").innerText.trim(),
      },
    };
    //Đẩy product vào mảng products[]
    products.push(product);
  });
  //Đưa mảng products[] vào localStorage
  localStorage.setItem("products", JSON.stringify(products));
}
// Hiển thị sản phẩm đã lưu vào localStorage
function displayProduct(arr, thisPageValue) {
  //Xóa sản phẩm đang hiển thị trước đó nếu nó tồn tại
  const productListRemove = document.querySelector(".all-product-list-remove");
  if (productListRemove) productListRemove.remove();
  //Chọn container và tạo thẻ product list
  const productContainer = document.querySelector("#all-product .container");
  const productList = document.createElement("div");
  productList.classList.add("all-product-list");
  productList.classList.add("all-product-list-remove");
  productList.id = "product-list";
  //Những sản phẩm xuất hiện bắt đầu và kết thúc ở vị trí nào trong mảng
  if (thisPageValue) thisPage = thisPageValue;
  const start = (thisPage - 1) * amountProduct1Page;
  const end = thisPage * amountProduct1Page;

  let productListContent = "";
  arr.forEach((item, index) => {
    if (index >= start && index < end) {
      productListContent += `<section class="product all-product-item" id="${item.ID}">
                <img
                  src="${item.Img}"
                  alt=""
                  class="product-img"
                />
                <p class="product-name">${item.Name}(N5I5052W1)</p>
                <div class="product-brand" style="display: none;">${item.Brand}</div>
                <span class="product-price">${item.Price}</span><sup class="sale-price">₫</sup>
                <div class="product-operation">
                  <i
                    class="fa-regular fa-eye more-details"
                    onclick="showDetail(this)"
                  >
                    <div class="note">Xem thêm thông tin</div>
                  </i>
                  <i class="fa-solid fa-cart-shopping add-cart" onclick="addToCart(this)">
                    <div class="note">Thêm vào giỏ hàng</div>
                  </i>
                </div>
                <div class="overlay" >
                  <div class="detail-box">
                    <i class="fa-solid fa-rectangle-xmark close"></i>
                    <section class="detail-head">
                      <img src="${item.Detail.Img}" class="detail-img">
                      <div class="detail-title">
                        <h2 class="detail-heading">${item.Name}</h2>
                        <span class="detail-price">${item.Price}</span><sup class="sale-price">₫</sup>
                        <div class="product-quantity">Kho: <span class="product-quantity-value">${item.Quantity}</span></div>
                        <div class="detail-quantity">
                          <i class="fa-solid fa-circle-minus desc-quantity" onclick="decreaseQuantity(this)"></i>
                          <div class="detail-quantity-value">1</div>
                          <i class="fa-solid fa-circle-plus plus-quantity" onclick="increaseQuantity(this,${item.Quantity})"></i>
                        </div>
                        <div class="detail-btn">
                          <button class="add-cart-btn" onclick="addToCart(this.parentElement.parentElement.parentElement.parentElement)">Thêm vào giỏ hàng</button>
                          <button class="buy-btn" onclick="buyNow(this)">Mua ngay</button>
                        </div>
                      </div>
                    </section>
                    <h3 class="detail-heading">Thông tin chi tiết</h3>
                    <table class="detail-table">
                    <tr>
                      <td>Bộ xử lý:</td>
                      <td class="CPU">${item.Detail.CPU}</td>
                    </tr>
                    <tr>
                      <td>Card màn hình:</td>
                      <td class="card">${item.Detail.Card}</td>
                    </tr>
                    <tr>
                      <td>Màn hình:</td>
                      <td class="screen">${item.Detail.Screen}</td>
                    </tr>
                    <tr>
                      <td>RAM:</td>
                      <td class="RAM">${item.Detail.RAM}</td>
                    </tr>
                    <tr>
                      <td>Bộ nhớ trong</td>
                      <td class="ROM">${item.Detail.ROM}</td>
                    </tr>
                    <tr>
                      <td>Hệ điều hành:</td>
                      <td class="OS">${item.Detail.OS}</td>
                    </tr>
                    <tr>
                      <td>Hỗ trợ kết nối:</td>
                      <td class="network">${item.Detail.Network}</td>
                    </tr>
                    <tr>
                      <td>Pin:</td>
                      <td class="pin">${item.Detail.Pin}</td>
                    </tr>
                    <tr>
                      <td>Khối lượng:</td>
                      <td class="weight">${item.Detail.Weight}</td>
                    </tr>
                  </table>
                  </div>
                </div>
              </section>`;
    }
  });
  productList.innerHTML = productListContent;
  productContainer.append(productList);
  createListPage(arr);
  hideOverlay();
  // addCart();
  // addCartQuantity();
}

// ----------------------- PHAN TRANG ------------------------
// Tạo mảng chứa tất cả sản phẩm
const productList = JSON.parse(localStorage.getItem("products")) || [];
//Tạo mảng chứa sản phẩm từng loại
let dellList = [];
let asusList = [];
let macList = [];
productList.forEach((product) => {
  if (product.Brand === "Dell") dellList.push(product);
  if (product.Brand === "Asus") asusList.push(product);
  if (product.Brand === "Mac") macList.push(product);
});
//Trang hiện tại là 1
let thisPage = 1;
//Số sản phẩm trong 1 trang là 6
const amountProduct1Page = 6;
function createListPage(arr) {
  const listPage = document.querySelector(".listPage");
  //Tạo số trang = số sảng phẩm / số sản phẩm 1 trang
  const amountPage = Math.ceil(arr.length / amountProduct1Page);
  let s = "";
  for (let i = 1; i <= amountPage; i++) {
    let type = "all";
    if (arr === dellList) type = "dell";
    else if (arr === asusList) type = "asus";
    else if (arr === macList) type = "mac";

    if (i === thisPage) {
      s += `<button onclick="changePage(${i})" class="numberlist active">${i}</button>`;
    } else {
      s += `<button onclick="changePage(${i})" class="numberlist">${i}</button>`;
    }
  }
  listPage.innerHTML = s;
}

function showDELL(typeElement) {
  thisPage = 1;
  displayProduct(dellList);
  localStorage.setItem("productFilter", JSON.stringify(dellList));
  const typeButton = document.querySelectorAll(".type-button");
  typeButton.forEach((type) => {
    type.classList.remove("active");
  });
  typeElement.classList.add("active");
}
function showASUS(typeElement) {
  thisPage = 1;
  displayProduct(asusList);
  localStorage.setItem("productFilter", JSON.stringify(asusList));
  const typeButton = document.querySelectorAll(".type-button");
  typeButton.forEach((type) => {
    type.classList.remove("active");
  });
  typeElement.classList.add("active");
}
function showMac(typeElement) {
  thisPage = 1;
  displayProduct(macList);
  localStorage.setItem("productFilter", JSON.stringify(macList));
  const typeButton = document.querySelectorAll(".type-button");
  typeButton.forEach((type) => {
    type.classList.remove("active");
  });
  typeElement.classList.add("active");
}
function showAll(typeElement) {
  thisPage = 1;
  displayProduct(productList);
  localStorage.setItem("productFilter", JSON.stringify(productList));
  const typeButton = document.querySelectorAll(".type-button");
  typeButton.forEach((type) => {
    type.classList.remove("active");
  });
  typeElement.classList.add("active");
}

function changePage(page) {
  thisPage = page;
  const productFilter = JSON.parse(localStorage.getItem("productFilter"));
  displayProduct(productFilter);
}
// --------------------- Mua ngay -------------------------
function buyNow(buyElement) {
  const productItem =
    buyElement.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement;
  const productID = productItem.id;
  const productImg = productItem.querySelector(".product-img").src;
  const productName = productItem.querySelector(".product-name").innerText;
  const productPrice = productItem.querySelector(".product-price").innerText;
  const productQuantity = productItem.querySelector(
    ".detail-quantity-value"
  ).value;
  const product = {
    ID: productID,
    Name: productName,
    Quantity: productQuantity,
    Price: productPrice,
    Img: productImg,
  };
  displayPayment([product], []);
}
// ---------------------- Search--------------------
function searchProduct(inputElement) {
  let valueSearchInput = document.querySelector("#search-product-input").value;
  const products = JSON.parse(localStorage.getItem("productFilter")) || [];
  let productSearch = Array.from(products).filter((value) => {
    const productName = value.Name.toUpperCase();
    return productName.includes(valueSearchInput.toUpperCase());
  });
  displayProduct(productSearch);

  inputElement.addEventListener("keydown", function (event) {
    // Kiểm tra nếu phím Enter được nhấn
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn hành động mặc định (submit form nếu có)

      // Cuộn đến phần tử sản phẩm
      document
        .querySelector("#all-product")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
// ---------------------- Filter--------------------
function toggleDisplayFilter(event, filterElement) {
  const filterBox = document.querySelector(".filter-box");
  const currentDisplay = getComputedStyle(filterBox).display;
  if (currentDisplay === "none") {
    event.stopPropagation(); // Ngăn chặn khi vừa mở Div đã tắt
    filterBox.style.display = "block";
    closeDiv(filterBox, filterElement);
  }
}
function filterProduct() {
  const brandChecked = document.querySelectorAll(
    'input[name="filter-brand"]:checked'
  );
  let brand = [];
  brandChecked.forEach((checked) => {
    brand.push(checked.value);
  });
  const ramChecked = document.querySelectorAll(
    'input[name="filter-ram"]:checked'
  );
  let ram = [];
  ramChecked.forEach((checked) => {
    ram.push(checked.value);
  });
  const romChecked = document.querySelectorAll(
    'input[name="filter-rom"]:checked'
  );
  let rom = [];
  romChecked.forEach((checked) => {
    rom.push(checked.value);
  });
  const priceStart = document.querySelector("#filter-price-start").value;
  const priceEnd = document.querySelector("#filter-price-end").value;
  const products = JSON.parse(localStorage.getItem("products"));
  const ramRegex = /(\d+)\s?GB/; // Lấy số dính với GB

  // Lọc mảng
  if (brand.length > 0) {
    for (let i = products.length - 1; i >= 0; i--) {
      let flag = false; // Đánh dấu nếu sản phẩm khớp với brand nào đó
      for (let j = 0; j < brand.length; j++) {
        if (products[i].Brand == brand[j]) {
          flag = true; // Nếu khớp, đánh dấu sản phẩm này
          break; // Thoát vòng lặp kiểm tra
        }
      }
      if (!flag) {
        products.splice(i, 1); // Xóa sản phẩm không khớp với bất kỳ brand nào
      }
    }
  }
  if (ram.length > 0)
    for (let i = products.length - 1; i >= 0; i--) {
      let flag = false;
      for (let j = 0; j < ram.length; j++) {
        if (products[i].Detail.RAM.match(ramRegex)[0] == ram[j]) {
          // lấy số trước GB và GB
          flag = true;
          break;
        }
      }
      if (!flag) {
        products.splice(i, 1);
      }
    }
  if (rom.length > 0)
    for (let i = products.length - 1; i >= 0; i--) {
      let flag = false;
      for (let j = 0; j < ram.length; j++) {
        if (products[i].Detail.RAM.match(ramRegex)[0] == ram[j]) {
          // lấy số trước GB và GB
          flag = true;
          break;
        }
      }
      if (!flag) {
        products.splice(i, 1);
      }
    }

  for (let i = products.length - 1; i >= 0; i--) {
    // duyệt lùi vì khi duyệt tiến xóa phần tử thì i không cập nhật dẫn đến bị sót
    if (
      (priceStart !== "" &&
        Number(products[i].Price.replace(/\./g, "")) < Number(priceStart)) ||
      (priceEnd !== "" &&
        Number(products[i].Price.replace(/\./g, "")) > Number(priceEnd))
    ) {
      products.splice(i, 1); // Xóa phần tử không phù hợp
    }
  }
  const typeButton = document.querySelectorAll(".type-button");
  typeButton.forEach((type) => {
    type.classList.remove("active");
  });
  displayProduct(products, 1);
  localStorage.setItem("productFilter", JSON.stringify(products));
}
// Khi ấn lọc
function submitFilter(event) {
  event.preventDefault();
  filterProduct();
  document.querySelector(".filter-box").style.display = "none";
  document
    .querySelector("#all-product")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}
// ----------------------- Sort ----------------------
function toggleDisplaySort(event, sortElement) {
  const sortList = document.querySelector(".sort-product-list");
  const currentDisplay = getComputedStyle(sortList).display;
  if (currentDisplay === "none") {
    event.stopPropagation(); // Ngăn chặn khi vừa mở Div đã tắt
    sortList.style.display = "block";
    closeDiv(sortList, sortElement);
  } else {
    sortList.style.display = "none";
  }
}
function sortProductIncrease() {
  const products = JSON.parse(localStorage.getItem("productFilter")) || [];
  products.sort((a, b) => {
    const priceA = parseInt(a.Price.replace(/\./g, ""));
    const priceB = parseInt(b.Price.replace(/\./g, ""));
    return priceA - priceB; // Giá tăng dần
  });
  displayProduct(products, 1);
  localStorage.setItem("productFilter", JSON.stringify(products));
}
function sortProductDecrease() {
  const products = JSON.parse(localStorage.getItem("productFilter")) || [];
  products.sort((a, b) => {
    const priceA = parseInt(a.Price.replace(/\./g, ""));
    const priceB = parseInt(b.Price.replace(/\./g, ""));
    return priceB - priceA; // Giá giảm dần
  });
  displayProduct(products, 1);
  localStorage.setItem("productFilter", JSON.stringify(products));
}

function closeDiv(myDiv, openBtn) {
  document.addEventListener("click", function (event) {
    // Kiểm tra xem người dùng có nhấn vào div hay không
    if (!myDiv.contains(event.target) && event.target !== openBtn) {
      myDiv.style.display = "none"; // Ẩn div nếu nhấn ngoài
    }
  });
}

function focusSearch() {
  const searchInput = document.querySelector("#search-product-input");
  searchInput.focus();
  searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
}
// ---------------------- Khi load trang --------------------
window.onload = function () {
  displayProduct(productList);
  localStorage.setItem("productFilter", JSON.stringify(productList));
};
