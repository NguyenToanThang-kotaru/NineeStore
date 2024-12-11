// functions
{
    // function to open and close pages in admin
    function toggleForm(formId, mode) {
        const form = document.getElementById(formId);
        form.classList.remove(mode === "open" ? "disable" : "enable");
        form.classList.add(mode === "open" ? "enable" : "disable");
    }

    // function to close the pop-up window when click the overlay

    function hideOverlay() {
        const overlayArr = document.querySelectorAll(".overlay") || [];
        overlayArr.forEach((overlays) => {
            overlays.addEventListener("click", (event) => {
                if (event.target === overlays) {
                    overlays.style.removeProperty("display");
                    overlays.style.display = "none";
                }
            });
        });
        const closes = document.querySelectorAll(".close") || [];
        closes.forEach((closebtn) => {
            closebtn.addEventListener("click", () => {
                // clear the inputs in the form
                const inputs = closebtn.parentElement.querySelectorAll("input");
                clearInput(inputs);
                closebtn.parentElement.parentElement.style.display = "none";
            });
        });
    }

    // clear the input inside the form
    function clearInput(inputs) {
        inputs.forEach((input) => {
            input.value = "";
            if (input.tagName === "IMG") {
                input.src = "";
            }
        });
    }

    // check if the input is empty
    function inputFilled(inputs) {
        for (let input of inputs) {
            if (input.tagName === "IMG" && input.src == "") {
                return false;
            }

            if (input.value == "") {
                return false;
            }
        }
        return true;
    }

    // function to check if the input is not filled
    function returnInputNotFilled(inputs) {
        for (let input of inputs) {
            if ((input.tagName === "IMG" && input.src == "") || input.value == "") {
                return input;
            }
        }
        return -1;
    }

    // find ID
    function findId(id, productArray) {
        for (let x in productArray) {
            if (productArray[x].id == id) {
                return Number(x);
            }
        }
        return -1;
    }

    // handle image files upload from an input element
    function uploadImg(inputElement) {
        const preview = inputElement.parentElement.querySelector(".form__preview"); // references preview image
        const fileSelected = inputElement.files;
        if (fileSelected.length > 0) {
            const fileToLoad = fileSelected[0];
            const fileReader = new FileReader();
            fileReader.onload = function (
                fileLoaderEvent // when the file are read
            ) {
                const srcNew = fileLoaderEvent.target.result;
                preview.src = srcNew;
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    // display more details
    function toggleMoreDetail() {
        const moreDetail = document.querySelector(".form__sp-description-more");
        const moreDisplayStyle = window.getComputedStyle(moreDetail).display; // contains the display of the description
        if (moreDisplayStyle === "none") {
            moreDetail.style.display = "block"; // Hiển thị phần tử
        } else {
            moreDetail.style.display = "none"; // Ẩn phần tử
        }
    }

    // show the add-product form
    function showProductAdd() {
        document.querySelector(".product__add").style.display = "block";
    }

    // show the add-admin form
    function showAdminAdd() {
        document.querySelector(".admin__add").style.display = "block";
    }

    function checkOrderCompletion() {
        console.log("checkOrderCompletion is running");
        if (localStorage.getItem("orders") != null) {
            const orders = JSON.parse(localStorage.getItem("orders"));
            const now = new Date();
            orders.forEach((order) => {
                if (order.Status == "Đã giao") {
                    const timeDiff = (now - new Date(order.OrderDate)) / 1000 / 60;
                    if (timeDiff > 5) {
                        const orderList =
                            document.querySelector(".order-table tbody").children;
                        for (let list of Array.from(orderList)) {
                            if (list.querySelector(".order__id").innerText == order.ID) {
                                // remove that row
                                list.remove();
                                break;
                            }
                        }
                    }
                    return;
                }
            });
        } else {
        }
    }

    function getDayToday() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        return new Date(year, month, day);
    }

    function getTimeDiff(date1, date2) {
        // console.log(date1.getDay() - date2.getDay());
        return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 24 * 60 * 60);
    }

    function getMonthDiff(date1, date2) {
        let month1 = date1.getFullYear() * 12 + date1.getMonth();
        let month2 = date2.getFullYear() * 12 + date2.getMonth();
        return Math.abs(month1 - month2);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // check if the account logged in is an admin
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (user.UserType == "admin") {
        document.querySelector(".form__cannot-go-in").style.display = "none";
        document.querySelector("#loginFromadmin").style.display = "none";
        document.querySelector(".admin__page").style.display = "block";
    } else {
        document.querySelector(".admin__page").style.display = "none";
        document.querySelector(".image__cannot-go-in").style.display = "block";
    }

    checkOrderCompletion();
    hideOverlay();
    // side menu
    const sp = document.getElementById("side-menu__menu-sp");
    const donHang = document.getElementById("side-menu__menu-order");
    const customer = document.getElementById("side-menu__menu-customer");
    const thongke = document.getElementById("side-menu__menu-statistic");
    const homepage = document.getElementById("side-menu__menu-homepage");
    const adminLogo = document.getElementById("side-menu__account");
    // customers
    const customerList = document.getElementById("customer__list-body");
    const adminList = document.getElementById("admin__list-body");
    // order
    const filterDate = document.getElementById("filter__date");
    const filterDateContainer = document.getElementById("filter-date");
    const filterStatusContainer = document.getElementById("filter-status");
    const filterStatus = document.getElementById("filter__status");
    const filterDistrictContainer = document.getElementById("filter-district");
    const filterDistrict = document.getElementById("filter__district");
    let showFilterDistrict = false;
    let showFilterDate = false;
    let showFilterStatus = false;
    // statistic

    // open / close a page when the icon is clicked
    {
        // open product lists
        sp.addEventListener("click", function () {
            toggleForm("product", "open");
            toggleForm("order", "close");
            toggleForm("customer", "close");
            toggleForm("statistic", "close");
            toggleForm("admin", "close");
        });

        // open orders
        donHang.addEventListener("click", function () {
            toggleForm("order", "open");
            toggleForm("product", "close");
            toggleForm("customer", "close");
            toggleForm("statistic", "close");
            toggleForm("admin", "close");
        });

        // open statistic
        thongke.addEventListener("click", function () {
            toggleForm("statistic", "open");
            toggleForm("product", "close");
            toggleForm("order", "close");
            toggleForm("customer", "close");
            toggleForm("admin", "close");
        });

        // open customer
        customer.addEventListener("click", function () {
            checkBlock();
            toggleForm("customer", "open");
            toggleForm("product", "close");
            toggleForm("order", "close");
            toggleForm("statistic", "close");
            toggleForm("admin", "close");
        });

        // open admin account
        adminLogo.addEventListener("click", function () {
            toggleForm("admin", "open");
            toggleForm("product", "close");
            toggleForm("order", "close");
            toggleForm("customer", "close");
            toggleForm("statistic", "close");
        });

        // return to the homepage
        homepage.addEventListener("click", function() {
            window.location.href = "NIneshop.html";
        });
    }

    // check if the customer is blocked => change the button status's style
    function checkBlock() {
        const customerStatus = customerList.querySelectorAll(".customer__status");
        customerStatus.forEach((status) => {
            const emailLock = status.parentElement.parentElement.querySelector(
                ".customer__userEmail"
            ).innerText;
            const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
            for (let i = 0; i < userLock.length; i++)
                if (emailLock == userLock[i]) {
                    status.innerText = "Đã khóa";
                    status.style.backgroundColor = "red";
                    status.style.color = "white";
                }
        });
    }

    // --------------------------------- Statistics-----------------------------
    const menu = document.querySelector("#menu-tke");
    const item_btn = document.querySelector("#items-btn");
    const customer_btn = document.querySelector("#customers-btn");
    const back1 = document.querySelector("#back-btn-mh");
    const back2 = document.querySelector("#back-btn-kh");
    const item_page = document.querySelector("#items-tke");
    const customer_page = document.querySelector("#customers-tke");

    customer_btn.addEventListener("click", showCustomer);
    item_btn.addEventListener("click", showItems);
    back1.addEventListener("click", backMenu);
    back2.addEventListener("click", backMenu);

    function showCustomer() {
        customer_page.style.display = "block";
        menu.style.display = "none";
    }

    function showItems() {
        item_page.style.display = "block";
        menu.style.display = "none";
    }

    function backMenu() {
        customer_page.style.display = "none";
        item_page.style.display = "none";
        menu.style.display = "block";
    }

    //-----------------------------------Thống kê ----------------------------
    // document
    //     .querySelector(".option-period-tke-mh")
    //     .addEventListener("change", (event) => {
    //         const selectedValue = event.target.value;
    //         console.log(selectedValue);
    //         const today = new Date();
    //         const orders = JSON.parse(localStorage.getItem("orders")) || [];

    //         // Lọc đơn hàng
    //         for (let i = orders.length - 1; i >= 0; i--) {
    //             const orderDate = new Date(orders[i].OrderDate);
    //             const diffTime = today.getTime() - orderDate.getTime(); // Khoảng cách thời gian (mili-giây)
    //             const diffDays = diffTime / (1000 * 60 * 60 * 24); // Chuyển sang ngày
    //             if (diffDays > selectedValue) {
    //                 orders.splice(i, 1); // Xóa đơn hàng nếu đã quá thời gian
    //             }
    //         }

    //         // Gọi hàm statisticProductvới danh sách đơn hàng đã lọc
    //         statisticProduct(orders);
    //     });
    // document
    //     .querySelector(".option-period-tke-kh")
    //     .addEventListener("change", (event) => {
    //         const selectedValue = event.target.value;
    //         console.log(selectedValue);
    //         const today = new Date();
    //         const orders = JSON.parse(localStorage.getItem("orders")) || [];

    //         // Lọc đơn hàng
    //         for (let i = orders.length - 1; i >= 0; i--) {
    //             const orderDate = new Date(orders[i].OrderDate);
    //             const diffTime = today.getTime() - orderDate.getTime(); // Khoảng cách thời gian (mili-giây)
    //             const diffDays = diffTime / (1000 * 60 * 60 * 24); // Chuyển sang ngày
    //             if (diffDays > selectedValue) {
    //                 orders.splice(i, 1); // Xóa đơn hàng nếu đã quá thời gian
    //             }
    //         }

    //         // Gọi hàm  statisticCustomer với danh sách đơn hàng đã lọc
    //         statisticCustomer(orders);
    //     });


    statisticProduct(JSON.parse(localStorage.getItem("orders")) || []);
    statisticCustomer(JSON.parse(localStorage.getItem("orders")) || []);

    const startPD = document.querySelector("#startPD");
    const endPD = document.querySelector("#endPD");


    startPD.addEventListener("change", filterDateStat);
    endPD.addEventListener("change", filterDateStat);

    function resetFilter() {
        startPD.value = ""; // Đặt lại giá trị của startPD
        endPD.value = "";   // Đặt lại giá trị của endPD
    }

    function filterDateStat() {
        if (startPD.value != 0 && endPD.value != 0) {
            const startDate = new Date(startPD.value);
            const endDate = new Date(endPD.value);
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            endDate.setHours(23, 59, 59, 999);
            // Lọc đơn hàng
            if (startDate > endDate) {
                alert("Vui lòng chọn ngày hợp lệ.");
                orders.length = 0;
                statisticProduct(orders)
                resetFilter(); // Gọi hàm resetFilter để đặt lại giá trị input
                return;
            }

            for (let i = orders.length - 1; i >= 0; i--) {
                const orderDate = new Date(orders[i].OrderDate);
                // Kiểm tra nếu orderDate nằm ngoài khoảng thời gian
                if (orderDate < startDate || orderDate > endDate) {
                    orders.splice(i, 1); // Xóa đơn hàng nếu không trong khoảng thời gian
                }
            }
            statisticProduct(orders);
        }
    }

    const startCus = document.querySelector("#startCus");
    const endCus = document.querySelector("#endCus");

    startCus.addEventListener("change", filterDateStat2);
    endCus.addEventListener("change", filterDateStat2);

    function resetFilter2() {
        startCus.value = ""; // Đặt lại giá trị của startPD
        endCus.value = "";   // Đặt lại giá trị của endPD
    }

    function filterDateStat2() {
        if (startCus.value != 0 && endCus.value != 0) {
            const startDate = new Date(startCus.value);
            const endDate = new Date(endCus.value);
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            endDate.setHours(23,59,59,999);
            // Lọc đơn hàng
            if (startDate > endDate) {
                alert("Vui lòng chọn ngày hợp lệ.");
                orders.length = 0;
                statisticCustomer(orders)
                resetFilter2(); // Gọi hàm resetFilter để đặt lại giá trị input
                return;
            }

            for (let i = orders.length - 1; i >= 0; i--) {
                const orderDate = new Date(orders[i].OrderDate);
                // Kiểm tra nếu orderDate nằm ngoài khoảng thời gian
                if (orderDate < startDate || orderDate > endDate) {
                    orders.splice(i, 1); // Xóa đơn hàng nếu không trong khoảng thời gian
                }
            }
            // Gọi hàm statisticProduct với danh sách đơn hàng đã lọc
            statisticCustomer(orders);
        }

    }




    function statisticProduct(orders) {
        const infoProduct = [];
        //Tạo một cái mảng để nhét thông tin sản phầm vào phục vụ cho việc thống kê
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].ProductList.length; j++) {
                const Product = orders[i].ProductList[j];
                let found = false;

                for (let k = 0; k < infoProduct.length; k++) {
                    if (infoProduct[k].ID == Product.ID) {
                        infoProduct[k].Quantity += Number(Product.Quantity);
                        infoProduct[k].Order.push(orders[i]);
                        found = true;
                        break;
                    }
                }

                if (found == false) {
                    const ProductList = {
                        ID: Product.ID,
                        Name: Product.Name,
                        Quantity: Number(Product.Quantity),
                        Price: Product.Price,
                        Order: [orders[i]],
                    };
                    infoProduct.push(ProductList);
                }
            }
        }

        let insertTotalQuantity = "";
        let totalQuantity = 0;
        let insertName = "";

        infoProduct.forEach((product) => {
            let CustomerBuyList = [];
            for (let i = 0; i < product.Order[0].ProductList.length; i++) {
                if (product.Order[0].ProductList[i].ID == product.ID) {
                    productName = product.Order[0].ProductList[i].Name;
                    productPrice = Number(
                        product.Order[0].ProductList[i].Price.replace(/\./g, "")
                    );
                    break;
                }
            }
            product.Order.forEach((order) => {
                const customer = {
                    Name: order.Customer.FullName,
                    QuantityBuy: order.ProductList.find((item) => item.ID == product.ID)
                        .Quantity,
                };
                CustomerBuyList.push(customer);
            });
            let hdContent = "";
            CustomerBuyList.forEach((customer) => {
                let price =
                    Number(product.Price.replace(/[.\/]/g, "")) *
                    Number(customer.QuantityBuy);
                hdContent += `<tr>
                   <td>${customer.Name}</td>
                   <td>${customer.QuantityBuy}</td>
                   <td>${price.toLocaleString("de-DE")}</td>
               </tr>`;
            });
            price = Number(product.Price.replace(/[.\/]/g, "")) * Number(product.Quantity);
            totalQuantity += Number(product.Quantity);
            insertName +=
                `<tr>
               <td>${product.Name}</td>
               <td><span class="product-tke-quantity-value">${product.Quantity
                }</span></td>
               <td><span class="product-tke-price-value">${price.toLocaleString(
                    "de-DE"
                )}</span> VNĐ</td>
                      <td>
                          <button class="show-hoadon-kh" onclick="showPaymentProduct(this)">Xem</button>
                          <div class='overlay'>
                              <div class="hoa-don-container" id="hoadon-items">
                                  <i class="fa-solid fa-rectangle-xmark close"></i>
                                  <div class="hoa-don-header">
                                      <h1>Hóa đơn</h1>
                                  </div>
                                  <div class="hoa-don-info">
                                      <div class="hoa-don-mat-hang">
                                          <h3>Thông tin sản phẩm</h3>
                                          <p>Mã: ${product.ID}</p>
                                          <p>Tên: ${product.Name}</p>
                                          <p>Giá: ${product.Price}</p>
                                      </div>
                                  </div>
                                  <div class="product-table-hd">
                                      <table class="product-table-info-hd">
                                          <thead>
                                              <tr class="table-header-hd">
                                                  <th>Tên khách hàng</th>
                                                  <th>Số lượng</th>
                                                  <th>Thành tiền</th>
                                              </tr>
                                          </thead>
                                          <tbody>`+ hdContent + `</tbody>
                                    </table>    
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;
            hideOverlay();
        });
        document.querySelector(".items-tbody-tke").innerHTML = insertName;
        insertTotalQuantity += `
                                 Tổng số lượng bán được: <span id="amount-revenue-tke">${totalQuantity}</span>mặt hàng  
                             `;
        document.querySelector(".total-revenue-tke").innerHTML = insertTotalQuantity;

        // Sắp xếp sản phẩm theo doanh thu giảm dần
        let TopBestPD = 0;
        document.querySelector("#TopBestPD").addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            // console.log(selectedValue);
            TopBestPD = selectedValue;
            const best = infoProduct;
            best.sort((a, b) => b.Quantity - a.Quantity);
            const topProducts = best.slice(0, TopBestPD);



            let insertBest = "";
            console.log(topProducts)
            topProducts.forEach((product) => {
                let price =
                    Number(product.Price.replace(/[.\/]/g, "")) * Number(product.Quantity);
                insertBest += `
               <tr class="item-row">
               <td>${product.Name}</td>
               <td>${product.Quantity}</td>
               <td>${price.toLocaleString("de-DE")} VNĐ</td>
               </tr>
               `;
            });


            let insertWorst = "";
            const worst = infoProduct;
            worst.sort((a, b) => a.Quantity - b.Quantity);
            const bottomProducts = worst.slice(0, TopBestPD);
            bottomProducts.forEach((product) => {
                let price =
                    Number(product.Price.replace(/[.\/]/g, "")) * Number(product.Quantity);
                insertWorst += `
                   <tr class="item-row">
                       <td>${product.Name}</td>
                       <td>${product.Quantity}</td>
                       <td>${price.toLocaleString("de-DE")} VNĐ</td>
                   </tr>
               `;
            });

            document.querySelector("#bestPD").innerHTML = insertBest;
            document.querySelector("#worstPD").innerHTML = insertWorst;
        });


        const products = JSON.parse(localStorage.getItem("products")) || []
        let insert_dontsold = ""
        products.forEach((product) => {
            if (product.QuantitySold == false) {
                let price = Number(product.Price.replace(/[.\/]/g, "")).toLocaleString("de-DE");
                insert_dontsold += `
                                    <tr>
                                        <td id="product-a">${product.Name}</td>
                                        <td id="price-a">${price} VNĐ</td>
                                        <td id="quantity-a">${product.Quantity}</td>
                                    </tr>
                                    `
            }
        })
        document.querySelector("#product-stats-body").innerHTML = insert_dontsold;


        hideOverlay();
    }

    // Gọi hàm

    function statisticCustomer(orders) {
        const customerStatArray = [];
        let totalPrice = 0;
        let insertTotalPrice = "";
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const customer = order.Customer;

            let found = false;

            for (let j = 0; j < customerStatArray.length; j++) {
                if (customerStatArray[j].UserId === customer.UserId) {
                    customerStatArray[j].TotalRevenue += Number(
                        order.TotalPrice.replace(/\./g, "")
                    );
                    customerStatArray[j].OrderHistory.push(order);

                    let TotalQuantity = 0;
                    order.ProductList.forEach((product) => {
                        TotalQuantity += Number(product.Quantity);
                    });
                    customerStatArray[j].Quantity += TotalQuantity;

                    found = true;
                    break;
                }
            }

            if (!found) {
                let TotalQuantity = 0;
                order.ProductList.forEach((product) => {
                    TotalQuantity += Number(product.Quantity);
                });

                const newCustomer = {
                    UserId: customer.UserId,
                    FullName: customer.FullName,
                    TotalRevenue: Number(order.TotalPrice.replace(/\./g, "")),
                    Quantity: TotalQuantity,
                    OrderHistory: [order],
                    Address: customer.Address,
                    Email: customer.Email,
                    Phone: customer.Phone,
                };
                customerStatArray.push(newCustomer);
            }
        }

        console.log(customerStatArray);
        let insertCus = "";
        const insert_Cus = document.getElementById("insertCus");
        customerStatArray.forEach((Customer) => {
            totalPrice += Customer.TotalRevenue
            insertCus += `<tr>
                       <td>${Customer.FullName}</td>
                       <td>${Customer.TotalRevenue.toLocaleString(
                "de-DE"
            )} VNĐ</td>
                         <td><button class="show-hoadon-kh" onclick="showPaymentProduct(this)">Xem</button>
                           <div class='overlay'>
                             <div class="hoa-don-container" id="hoadon-customers">
                               <i class="fa-solid fa-rectangle-xmark close"></i>
                               <div class="hoa-don-header">
                                   <h1>Hóa đơn</h1>
                               </div>
                               <div class="hoa-don-info">
                                   <div class="hoa-don-customer">
                                       <h3>Thông tin khách hàng</h3>
                                       <p>Họ tên: ${Customer.FullName}</p>
                                       <p>Địa chỉ: ${Customer.Address}</p>
                                       <p>Số điện thoại: ${Customer.Phone}</p>
                                       <p>Email: ${Customer.Email}</p>
                                   </div>
                               </div>
                               <div class="product-table-hd">
                                 <table class="product-table-info-hd">
                                   <thead>
                                       <tr class="table-header-hd">
                                           <th>Tên sản phẩm</th>
                                           <th>Số lượng</th>
                                           <th>Đơn giá</th>
                                           <th>Thành tiền</th>
                                       </tr>
                                   </thead>
                                   <tbody>`;
            Customer.OrderHistory.forEach((product) => {
                product.ProductList.forEach((product2) => {
                    const quantity = Number(product2.Quantity);
                    const price = Number(
                        product2.Price.replace(/\./g, "").replace(",", ".")
                    );
                    const total = quantity * price;

                    insertCus += `<tr>
                               <td>${product2.Name}</td>
                               <td>${quantity}</td>
                               <td>${price.toLocaleString("de-DE")} VNĐ</td>
                               <td>${total.toLocaleString("de-DE")} VNĐ</td>
                           </tr>`;
                });
            });
            insertCus += `</tbody></table></div></div></div></td></tr>`;
        });
        insert_Cus.innerHTML = insertCus;

        insertTotalPrice += `
                          Tổng doanh thu: <span id="amount-revenue-tke">${totalPrice.toLocaleString("de-DE")}</span>VNĐ
                          `
        document.querySelector('#total-revenue-tke1').innerHTML = insertTotalPrice

        let TopBestCus = 0;
        document.querySelector("#TopBestCus").addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            // console.log(selectedValue);
            TopBestCus = selectedValue;
            console.log(TopBestCus)
            let insertBestCus = "";
            let BestCus = customerStatArray;
            BestCus.sort((a, b) => b.Quantity - a.Quantity);
            const topCus = BestCus.slice(0, TopBestCus);
            topCus.forEach((product) => {
                insertBestCus += `
                                    <tr class="item-row">
                                    <td>${product.FullName}</td>
                                    <td>${product.Quantity}</td>
                                    <td>${product.TotalRevenue.toLocaleString("de-DE")} VNĐ</td>
                                    </tr>
                                `;
            });

            let insertWorstCus = "";
            let WorstCus = customerStatArray;
            WorstCus.sort((a, b) => a.Quantity - b.Quantity);
            const bottomCus = WorstCus.slice(0, TopBestCus);
            bottomCus.forEach((product) => {
                insertWorstCus += `
                                    <tr class="item-row">
                                    <td>${product.FullName}</td>
                                    <td>${product.Quantity}</td>
                                    <td>${product.TotalRevenue.toLocaleString("de-DE")} VNĐ</td>
                                    </tr>
                                `;
            });

            document.querySelector("#bestCus").innerHTML = insertBestCus;
            document.querySelector("#worstCus").innerHTML = insertWorstCus;
        })


        hideOverlay();
    }


    // Hoa don

    const hoadon_kh_btn = document.querySelectorAll(".show-hoadon-kh");
    const hoadon_mh_btn = document.querySelectorAll(".show-hoadon-mh");
    const hoadon_kh_page = document.querySelector("#hoadon-customers");
    const hoadon_mh_page = document.querySelector("#hoadon-items");
    const overlay = document.querySelector(".overlay-hd");

    //--------------------------------- Customer -----------------------------
    // add customer to the table when the page is loaded
    function addCustomertoTable() {
        const userLocal = JSON.parse(localStorage.getItem("users")) || [];
        let customerContent = "";
        let adminContent = "";
        userLocal.forEach((user) => {
            if (user.UserType == "customer") {
                customerContent += `<tr>
                    <td class="customer__userID">${user.UserId}</td>
                    <td class="customer__userName">${user.FullName}</td>
                    <td class="customer__userPhone">${user.Phone}</td>
                    <td class="customer__userAddress">${user.Address}, Phường ${user.Ward}, Quận ${user.District}, ${user.City}</td>
                    <td class="customer__userEmail">${user.Email}</td>
                    <td><button type="button" class="customer__status" title="Nhấp chuột để thay đổi trạng thái">Hoạt động</button></td>
                    <td>
                        <i class="fa-regular fa-pen-to-square edit-icon" onclick="editCustomer(this)"></i>
                    </td>
                    <td class="customer__userdistrict" style="display: none;">${user.District}</td>
                    <td class="customer__usercity" style="display: none;">${user.City}</td>
                    <td class="customer__userward" style="display: none;">${user.Ward}</td>
                </tr>`;
            }
            else if (user.UserType = "admin") {
                adminContent += `<tr>
                    <td class="admin__userID">${admin.UserId}</td>
                    <td class="admin__userName">${admin.FullName}</td>
                    <td class="admin__userPhone">${admin.Phone}</td>
                    <td class="admin__userEmail">${admin.Email}</td>
                    <td class="admin__userAddress">${admin.Address}</td>
                    <td class="admin__username">${admin.UserName}</td>
                </tr>`;
            }
        });
        customerList.innerHTML = customerContent;
        adminList.innerHTML = adminContent;
    }
    addCustomertoTable();
    //--------------------------------- Product -----------------------------
    // ------------ Add ------------
    function addProducttoTable() {
        const products = JSON.parse(localStorage.getItem("products"));
        let productContent = "";
        products.forEach((product) => {
            productContent += `<tr>
                  <td class="product__id">${product.ID}</td>
                  <td class="product__name">${product.Name}</td>
                  <td class="product__quantity">${product.Quantity}</td>
                  <td class="product__price">${product.Price}<sup>₫</sup></td>
                  <td class="product__img"><img src="${product.Img}" /></td>
                  <td>
                      <div class="admin-detail-product">
                        <button class="show-detail-btn" onclick="showDetailProductAdmin(this)">Chi tiết</button>
                        <div class="overlay detail-admin" >
                          <div class="detail-box">
                              <i class="fa-solid fa-rectangle-xmark close"></i>
                              <section class="detail-head">
                                <img src="${product.Detail.Img}" class="detail-img">
                                <div class="detail-title">
                                  <h2 class="detail-heading">${product.Name}</h2>
                                  <span class="detail-price">${product.Price}</span><sup class="sale-price">₫</sup>
                                  <div class="product-quantity">Kho: <span class="product-quantity-value">${product.Quantity}</span></div>
                                </div>
                              </section>
                              <h3 class="detail-heading">Thông tin chi tiết</h3>
                              <table class="detail-table">
                                <tr>
                                  <td>Bộ xử lý:</td>
                                  <td class="CPU">${product.Detail.CPU}</td>
                                </tr>
                                <tr>
                                  <td>Card màn hình:</td>
                                  <td class="card">${product.Detail.Card}</td>
                                </tr>
                                <tr>
                                  <td>Màn hình:</td>
                                  <td class="screen">${product.Detail.Screen}</td>
                                </tr>
                                <tr>
                                  <td>RAM:</td>
                                  <td class="RAM">${product.Detail.RAM}</td>
                                </tr>
                                <tr>
                                  <td>Bộ nhớ trong</td>
                                  <td class="ROM">${product.Detail.ROM}</td>
                                </tr>
                                <tr>
                                  <td>Hệ điều hành:</td>
                                  <td class="OS">${product.Detail.OS}</td>
                                </tr>
                                <tr>
                                  <td>Hỗ trợ kết nối:</td>
                                  <td class="network">${product.Detail.Network}</td>
                                </tr>
                                <tr>
                                  <td>Pin:</td>
                                  <td class="pin">${product.Detail.Pin}</td>
                                </tr>
                                <tr>
                                  <td>Khối lượng:</td>
                                  <td class="weight">${product.Detail.Weight}</td>
                                </tr>
                                <tr>
                                  <td>Old:</td>
                                  <td class="old">${product.Detail.Old}</td>
                                </tr>
                                <tr>
                                  <td>Sale:</td>
                                  <td class="sale">${product.Detail.Sale}</td>
                                </tr>
  
                              </table>
                          </div>
                        </div>
                      </div>
                      <i class="fa-regular fa-pen-to-square edit-icon" onclick="editProduct(this)"></i>
                      <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(this)"></i>
                  </td>
              </tr>`;
        });
        document.querySelector("#product__list-body").innerHTML = productContent;
        hideOverlay();
    }
    function showDetailProductAdmin(btnElement) {
        btnElement.parentElement.querySelector(".overlay").style.display = "block";
    }
    addProducttoTable();
    //Khi ấn vào submit thì thêm vào localStorage và thêm sp vào bảng (trường hợp chưa load trang)
    document
        .querySelector(".form__submit-btn")
        .addEventListener("click", function (event) {
            event.preventDefault();
            const name = document.getElementById("form__sp-name");
            const brand = document.getElementById("form__sp-brand");
            const quantity = document.getElementById("form__sp-quantity");
            const price = document.getElementById("form__sp-price");
            const img = document.getElementById("form__preview-img");
            const cpu = document.getElementById("form__sp-cpu");
            const screen = document.getElementById("form__sp-screen");
            const ram = document.getElementById("form__sp-ram");
            const rom = document.getElementById("form__sp-rom");
            const os = document.getElementById("form__sp-os");
            const card = document.getElementById("form__sp-card");
            const pin = document.getElementById("form__sp-pin");
            const network = document.getElementById("form__sp-network");
            const weight = document.getElementById("form__sp-weight");
            const old = document.getElementById("form__sp-old");
            const sale = document.getElementById("form__sp-sale");
            const detailImg = document.getElementById("form__preview-detail-img");
            if (!inputFilled([name, brand, quantity, price, img])) {
                alert("Vui lòng nhập đầy đủ các thông tin chính");
                return false;
            } else if (isNaN(Number(price.value.replace(/\./g, "")))) {
                alert("Vui lòng nhập số.");
                price.focus();
                return false;
            } else if (isNaN(quantity.value)) {
                alert("Vui lòng nhập số.");
                quantity.focus();
                return false;
            }
            // bring values into table
            else {
                // do the thing
                const product = {
                    ID: Math.round(Math.random() * 10000000000),
                    Img: img.src,
                    Name: name.value,
                    Brand: brand.value,
                    Price: Number(price.value.replace(/\./g, "")).toLocaleString("de-DE"),
                    Quantity: quantity.value,
                    Detail: {
                        Img: detailImg.src,
                        CPU: cpu.value,
                        Screen: screen.value,
                        RAM: ram.value,
                        ROM: rom.value,
                        OS: os.value,
                        Card: card.value,
                        Pin: pin.value,
                        Network: network.value,
                        Weight: weight.value,
                        Old: old.checked,
                        Sale: sale.value,
                    },
                };
                // Thêm vào bảng khi không load trang
                const productContent = `<tr>
                  <td class="product__id">${product.ID}</td>
                  <td class="product__name">${product.Name}</td>
                  <td class="product__quantity">${product.Quantity}</td>
                  <td class="product__price">${product.Price}</td>
                  <td class="product__img"><img src="${product.Img}"/></td>
                  <td>
                    <button class="show-detail-btn">Chi tiết</button>
                      <i class="fa-regular fa-pen-to-square edit-icon" onclick="editProduct(this)"></i>
                      <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(this)"></i>
                  </td>
              </tr>`;
                const addtr = document.createElement("tr");
                addtr.innerHTML = productContent;
                document.getElementById("product__list-body").appendChild(addtr);
                hideOverlay();
                // store data into localStorage
                const products = JSON.parse(localStorage.getItem("products")) || [];
                products.push(product);
                localStorage.setItem("products", JSON.stringify(products));
                showDetailProductAdmin();
                // make all the input empty
                clearInput([name, brand, quantity, price, img, price, cpu, screen, ram, rom, os, card, pin, network, weight]);
                document.querySelector("#form__preview-img").src = "./img/no-photo-or-blank-image.jpg";
                document.querySelector("#form__preview-detail-img").src = "./img/no-photo-or-blank-image.jpg";
            }
        });

    // Function to block customers
    customerList.addEventListener("click", function (event) {
        if (event.target.closest(".customer__status")) {
            // if the button clicked has the class "customer__status"
            const customerStatus = event.target.closest(".customer__status");
            if (customerStatus.innerText == "Hoạt động") {
                if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
                    customerStatus.innerText = "Đã khóa";
                    customerStatus.style.backgroundColor = "red";
                    customerStatus.style.color = "white";
                    // take the customer's email, add it in the userLock array, then update the local storage
                    const emailLock =
                        customerStatus.parentElement.parentElement.querySelector(
                            ".customer__userEmail"
                        ).innerText;
                    const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
                    userLock.push(emailLock);
                    localStorage.setItem("userLock", JSON.stringify(userLock));
                }
            } else if (customerStatus.innerText == "Đã khóa") {
                if (confirm("Bạn có chắc chắn muốn mở khóa tài khoản này không?")) {
                    customerStatus.innerText = "Hoạt động";
                    customerStatus.style.backgroundColor = "green";
                    customerStatus.style.color = "black";
                    // take the customer's email, remove it out the userLock array, then update the local storage
                    const emailLock =
                        customerStatus.parentElement.parentElement.querySelector(
                            ".customer__userEmail"
                        ).innerText;
                    const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
                    for (let i = 0; i < userLock.length; i++)
                        if (emailLock == userLock[i]) userLock.splice(i, 1);
                    localStorage.setItem("userLock", JSON.stringify(userLock));
                }
            }
        }
    });

    // ------------ Add admin manually ------------
    document
        .querySelector("#form__admin-submit")
        .addEventListener("click", function (event) {
            event.preventDefault();
            const name = document.getElementById("form__admin-name");
            const phone = document.getElementById("form__admin-phone");
            const email = document.getElementById("form__admin-email");
            const address = document.getElementById("form__admin-address");
            const ward = document.getElementById("form__admin-ward");
            const district = document.getElementById("form__admin-district");
            const city = document.getElementById("form__admin-city");
            const userName = document.getElementById("form__admin-username");
            const password = document.getElementById("form__admin-password");

            const users = JSON.parse(localStorage.getItem("users")) || [];
            // check if the information admin filled is valid
            if (!inputFilled([name, phone, email, address, userName, password])) {
                alert("Vui lòng điền đầy đủ thông tin.");
                return false;
            } else if (!isNaN(name.value)) {
                alert("Vui lòng nhập tên.");
                name.focus();
                return false;
            } else if (isNaN(phone.value) || phone.value.length != 10) {
                alert("Vui lòng nhập số (số phải đủ 10 kí tự).");
                phone.focus();
                return false;
            } else if (!isNaN(password.value) || password.value.length < 8) {
                alert("Mật khẩu phải có ít nhất 8 kí tự và phải chưa kí tự chữ.");
                password.focus();
                return false;
            } else if (!userName.value.match(/[a-zA-Z0-9]/) || (/^\d+$/).test(userName.value)) {
                alert("Tên đăng nhập không được chứa toàn kí tự số và không được chứa kí tự đặc biệt");
                userName.focus();
                return false;
            } else {
                // check if the information is already in the user database
                for (let i = 0; i < users.length; i++) {
                    if (users[i].Email == email.value) {
                        alert("Email này đã được đăng ký.");
                        email.focus();
                        return false;
                    }
                    if (users[i].Phone == phone.value) {
                        alert("Số điện thoại này đã được đăng ký.");
                        phone.focus();
                        return false;
                    }
                    if (users[i].UserName == userName.value) {
                        alert("Tên đăng nhập này đã được đăng ký.");
                        userName.focus();
                        return false;
                    }
                }
            }

            // bring values into table
            // do the thing
            const admin = {
                UserId: Math.ceil(Math.random() * 10000000000),
                FullName: name.value,
                Phone: phone.value,
                Address: `${address.value}, Phường ${ward.value}, Quận ${district.value}, ${city.value}`,
                UserName: userName.value,
                Email: email.value,
                Password: password.value,
                OrderHistory: [],
                UserType: "admin"
            };
            // Thêm vào bảng khi không load trang
            const adminInfo = `<tr>
                <td class="admin__userID">${admin.UserId}</td>
                <td class="admin__userName">${admin.FullName}</td>
                <td class="admin__userPhone">${admin.Phone}</td>
                <td class="admin__userEmail">${admin.Email}</td>
                <td class="admin__userAddress">${admin.Address}</td>
                <td class="admin__username">${admin.UserName}</td>
            </tr>`;
            adminList.innerHTML += adminInfo;
            // store data into localStorage
            users.push(admin);
            localStorage.setItem("users", JSON.stringify(users));

            // make all the input empty
            clearInput([name, phone, email, address, ward, district, city, userName, password]);
        });

    // ------------ Add admin when the page is loaded ------------
    function addAdminToTable() {
        const admins = JSON.parse(localStorage.getItem("users")) || [];
        let adminContent = "";
        admins.forEach((admin) => {
            if (admin.UserType == "admin") {
                adminContent += `<tr>
                    <td class="admin__userID">${admin.UserId}</td>
                    <td class="admin__userName">${admin.FullName}</td>
                    <td class="admin__userPhone">${admin.Phone}</td>
                    <td class="admin__userEmail">${admin.Email}</td>
                    <td class="admin__userAddress">${admin.Address}</td>
                    <td class="admin__username">${admin.UserName}</td>
                </tr>`;
            }
        });
        adminList.innerHTML = adminContent;
    }
    addAdminToTable();

    // filter in order
    // open/close the date filter window
    document
        .getElementById("order__filter-date")
        .addEventListener("click", function () {
            if (!showFilterDate) {
                console.log("open the filter date")
                filterStatusContainer.style.display = "none";
                showFilterStatus = false;
                filterDistrictContainer.style.display = "none";
                showFilterDistrict = false;
                filterDateContainer.style.display = "flex";
                filterDateContainer.style.justifyContent = "flex-end";
                showFilterDate = true;
            } else if (showFilterDate) {
                filterDateContainer.style.display = "none";
                showFilterDate = false;
            }

        });

    filterDate.addEventListener("change", function () {
        if (filterDate.value == ".") {
            hideOverlay();
            return;
        }
        addOrdertoTable();
        if (filterDate.value == "all") {
            hideOverlay();
            return;
        } else {
            let today = getDayToday();
            const orderList = document
                .querySelector(".order-table tbody")
                .querySelectorAll("tr");
            if (filterDate.value == "today") {
                for (let row of orderList) {
                    if (row.querySelector(".order__date") === null) {
                        hideOverlay();
                        continue;
                    }
                    let tmp = row.querySelector(".order__date").innerText;
                    console.log(tmp);
                    let [day, month, year] = tmp.split("/");
                    let date = new Date(year, month - 1, day);
                    console.log(date);
                    if (getTimeDiff(today, date) !== 0) {
                        console.log("remove" + date);
                        row.remove();
                    }
                }

                hideOverlay();
            } else if (filterDate.value == "yesterday") {
                for (let row of orderList) {
                    if (row.querySelector(".order__date") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__date").innerText;
                    let [day, month, year] = tmp.split("/");
                    let date = new Date(year, month - 1, day);
                    if (getTimeDiff(today, date) !== 1) {
                        console.log("remove" + date);
                        row.remove();
                    }
                }

                hideOverlay();
            } else if (filterDate.value == "three-days") {
                for (let row of orderList) {
                    if (row.querySelector(".order__date") === null) {
                        hideOverlay();
                        continue;
                    }
                    let tmp = row.querySelector(".order__date").innerText;
                    let [day, month, year] = tmp.split("/");
                    let date = new Date(year, month - 1, day);
                    if (getTimeDiff(today, date) > 3) {
                        console.log("remove" + date);
                        row.remove();
                    }
                }

                hideOverlay();
            } else if (filterDate.value == "this-week") {
                for (let row of orderList) {
                    if (row.querySelector(".order__date") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__date").innerText;
                    let [day, month, year] = tmp.split("/");
                    let date = new Date(year, month - 1, day);
                    if (getTimeDiff(today, date) > 7) {
                        console.log("remove" + date);
                        row.remove();
                    }
                }

                hideOverlay();
            } else if (filterDate.value == "this-month") {
                for (let row of orderList) {
                    if (row.querySelector(".order__date") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__date").innerText;
                    let [day, month, year] = tmp.split("/");
                    let date = new Date(year, month - 1, day);
                    if (today.getMonth() !== date.getMonth()) {
                        console.log("remove" + date);
                        row.remove();
                    }
                }

                hideOverlay();
            } else if (filterDate.value == "last-month") {
                for (let row of orderList) {
                    if (row.querySelector(".order__date") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__date").innerText;
                    let [day, month, year] = tmp.split("/");
                    let date = new Date(year, month - 1, day);
                    if (date.getMonth() !== today.getMonth() - 1) {
                        console.log("remove" + date);
                        row.remove();
                    }
                }
            }
        }
    });

    // open/close the address filter window
    document
        .getElementById("order__filter-status")
        .addEventListener("click", function () {
            if (!showFilterStatus) {
                filterDateContainer.style.display = "none";
                showFilterDate = false;
                filterDistrictContainer.style.display = "none";
                showFilterDistrict = false;
                filterStatusContainer.style.display = "flex";
                filterStatusContainer.style.justifyContent = "flex-end";
                showFilterStatus = true;
            } else if (showFilterStatus) {
                filterStatusContainer.style.display = "none";
                showFilterStatus = false;
            }
        });

    // lọc theo trạng thái
    filterStatus.addEventListener("change", function () {
        if (filterStatus.value == ".") {
            hideOverlay();
            return;
        }
        addOrdertoTable();
        if (filterStatus.value == "all") {
            hideOverlay();
            return;
        } else {
            const orderList = document
                .querySelector(".order-table tbody")
                .querySelectorAll("tr");
            if (filterStatus.value == "chuaxuly") {
                for (let row of orderList) {
                    if (row.querySelector(".order__status") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__status").innerText;
                    console.log(tmp);
                    if (tmp != "Chưa xử lý") {
                        row.remove();
                    }
                }
                hideOverlay();
            }
            if (filterStatus.value == "dagiao") {
                for (let row of orderList) {
                    if (row.querySelector(".order__status") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__status").innerText;
                    console.log(tmp);
                    if (tmp != "Đã giao") {
                        row.remove();
                    }
                }
                hideOverlay();
            }
            if (filterStatus.value == "dahuy") {
                for (let row of orderList) {
                    if (row.querySelector(".order__status") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__status").innerText;
                    console.log(tmp);
                    if (tmp != "Đã hủy") {
                        row.remove();
                    }
                }
                hideOverlay();
            }
            if (filterStatus.value == "daxacnhan") {
                for (let row of orderList) {
                    if (row.querySelector(".order__status") === null) {
                        continue;
                    }
                    let tmp = row.querySelector(".order__status").innerText;
                    console.log(tmp);
                    if (tmp != "Đã xác nhận") {
                        row.remove();
                    }
                }
                hideOverlay();
            }
        }
    });

    // mở mục sắp xếp theo quận
    document.getElementById("order__filter-district").addEventListener("click", function (event) {
        event.stopPropagation();
        if (!showFilterDistrict) {
            filterDateContainer.style.display = "none";
            showFilterDate = false;
            filterStatusContainer.style.display = "none";
            showFilterStatus = false;
            filterDistrictContainer.style.display = "flex";
            filterDistrictContainer.style.justifyContent = "flex-end";
            showFilterDistrict = true;
        } else if (showFilterDistrict) {
            filterDistrictContainer.style.display = "none";
            showFilterDistrict = false;
        }
    });

    document.getElementById("filter__district").addEventListener("change", function () {
        if (this.value == ".") {
            hideOverlay();
            return;
        }

        if (this.value == "all") {
            // Khôi phục dữ liệu gốc
            const originalOrders = JSON.parse(localStorage.getItem("orders")) || [];
            localStorage.setItem("orders", JSON.stringify(originalOrders));
            addOrdertoTable();
            hideOverlay();
            return;
        }

        // Lấy dữ liệu từ localStorage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        let sortedOrders = [...orders];

        // Sắp xếp theo quận
        if (this.value == "up") { // Tăng dần
            sortedOrders.sort((a, b) => {
                return a.Customer.District.localeCompare(b.Customer.District)
            });
        }
        else if (this.value == "down") { // Giảm dần
            sortedOrders.sort((a, b) => {
                return b.Customer.District.localeCompare(a.Customer.District)
            });
        }
        // Lưu vào localStorage tạm thời
        localStorage.setItem("orders", JSON.stringify(sortedOrders));

        // Hiển thị lại bảng với dữ liệu đã sắp xếp
        addOrdertoTable();

        // Ẩn tất cả overlays
        document.querySelectorAll(".overlay").forEach(overlay => {
            overlay.style.display = "none";
        });

        hideOverlay();
    });



    // filter the order by date
});

// ------------ Edit ------------
function editProduct(productElement) {
    // gán các thuộc tính có sẵn của sp vào khung input
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const divProduct = productElement.parentElement.parentElement;
    const id = divProduct.querySelector(".product__id").innerText;
    const nameText = divProduct.querySelector(".product__name");
    const quantityText = divProduct.querySelector(".product__quantity");
    const priceText = divProduct.querySelector(".product__price");
    const imgDiv = divProduct.querySelector(".product__img");
    for (let i = 0; i < products.length; i++) {
        if (products[i].ID == id) {
            const name = document.getElementById("form__edit-name");
            const brand = document.getElementById("form__edit-brand");
            const quantity = document.getElementById("form__edit-quantity");
            const price = document.getElementById("form__edit-price");
            const img = document.getElementById("form__edit-preview-img");
            const cpu = document.getElementById("form__edit-cpu");
            const screen = document.getElementById("form__edit-screen");
            const ram = document.getElementById("form__edit-ram");
            const rom = document.getElementById("form__edit-rom");
            const os = document.getElementById("form__edit-os");
            const card = document.getElementById("form__edit-card");
            const pin = document.getElementById("form__edit-pin");
            const network = document.getElementById("form__edit-network");
            const weight = document.getElementById("form__edit-weight");
            const old = document.getElementById("form__edit-old");
            const sale = document.getElementById("form__edit-sale");
            const detailImg = document.getElementById(
                "form__edit-preview-detail-img"
            );
            const brandOpt = brand.querySelectorAll("option");
            brandOpt.forEach((opt) => {
                if (opt.value == products[i].Brand) opt.selected = true;
            });
            name.value = products[i].Name;
            quantity.value = products[i].Quantity;
            price.value = products[i].Price;
            img.src = products[i].Img;
            cpu.value = products[i].Detail.CPU;
            screen.value = products[i].Detail.Screen;
            ram.value = products[i].Detail.RAM;
            rom.value = products[i].Detail.ROM;
            os.value = products[i].Detail.OS;
            card.value = products[i].Detail.Card;
            pin.value = products[i].Detail.Pin;
            network.value = products[i].Detail.Network;
            weight.value = products[i].Detail.Weight;
            old.checked = products[i].Detail.Old;
            sale.value = products[i].Detail.Sale;
            detailImg.src = products[i].Detail.Img;
            // ----- Submit ------
            const submitBtn = document.querySelector(".form__edit-submit-btn");

            // Xóa sự kiện trước khi gán mới
            submitBtn.replaceWith(submitBtn.cloneNode(true)); // Replace để đảm bảo xóa mọi sự kiện
            document
                .querySelector(".form__edit-submit-btn")
                .addEventListener("click", (event) => {
                    event.preventDefault();
                    //kiểm tra lại
                    if (!inputFilled([name, brand, quantity, price, img])) {
                        alert("Vui lòng nhập đầy đủ các thông tin chính");
                        return false;
                    } else if (isNaN(Number(price.value.replace(/\./g, "")))) {
                        alert("Vui lòng nhập số.");
                        price.focus();
                        return false;
                    } else if (isNaN(quantity.value)) {
                        alert("Vui lòng nhập số.");
                        quantity.focus();
                        return false;
                    } else {
                        const product = {
                            ID: id,
                            Img: img.src,
                            Name: name.value,
                            Brand: brand.value,
                            Price: price.value,
                            Quantity: quantity.value,
                            OriginalPrice: "",
                            Detail: {
                                Img: detailImg.src,
                                CPU: cpu.value,
                                Screen: screen.value,
                                RAM: ram.value,
                                ROM: rom.value,
                                OS: os.value,
                                Card: card.value,
                                Pin: pin.value,
                                Network: network.value,
                                Weight: weight.value,
                                Old: old.checked,
                                Sale: sale.value,
                            },
                        };
                        nameText.innerText = product.Name;
                        quantityText.innerText = product.Quantity;
                        priceText.innerText = product.Price;
                        imgDiv.src = product.Img;
                        alert("Đã sửa thành công");
                        products[i] = product;
                        localStorage.setItem("products", JSON.stringify(products));
                    }
                });
            break;
        }
    }
    document.querySelector(".product__edit").style.display = "block";
}
// ------------ Delete ------------
function deleteProduct(productElement) {
    if (confirm("Bạn có chắc chắn xóa sản phẩm này")) {
        const divProduct = productElement.parentElement.parentElement;
        const id = divProduct.querySelector(".product__id").innerText;
        const products = JSON.parse(localStorage.getItem("products")) || [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].ID == id) {
                products.splice(i, 1);
                localStorage.setItem("products", JSON.stringify(products));
                break;
            }
        }
        divProduct.remove();
    }
}

//--------------------------------- Order -----------------------------
// Add order when the page is loaded
function addOrdertoTable() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderContent = "";
    orders.forEach((order) => {
        //detail
        let productContent = "";
        order.ProductList.forEach((product) => {
            productContent += `<tr>
                  <td class="order-detail-id">${product.ID}</td>
                  <td>
                      <div class="order-detail-product">
                          <img src="${product.Img}" class="order-detail-img"/>
                          <div class="order-detail-name">${product.Name}</div>
                      </div>
                  </td>
                  <td>
                      <span class="order-detail-price">${product.Price}</span><sup>đ</sup>
                  </td>
                  <td class="order-detail-quantity">${product.Quantity}</td>
              </tr>`;
        });
        //order
        //Đặt trạng thái cho bảng
        let cxlSelected = "";
        let dxnSelected = "";
        let dgSelected = "";
        let dhSelected = "";
        if (order.Status == "Chưa xử lý") cxlSelected = 'selected';
        else if (order.Status == "Đã xác nhận") dxnSelected = "selected";
        else if (order.Status == "Đã giao thành công") dgSelected = "selected";
        else dhSelected = "selected";
        const orderDate = new Date(order.OrderDate);
        const formattedDate = new Intl.DateTimeFormat("vi-VN").format(orderDate);
        orderContent +=
            `<tr>
            <td class="order__id">${order.ID}</td>
            <td class="order__customer-id">${order.Customer.UserId}</td>
            <td class="order__customer-district" style="display: none">${order.Customer.District}</td>
            <td class="order__price"><span class="order__price">${order.TotalPrice}</span><sup>đ</sup></td>
            <td class="order__date">${formattedDate}</td>
            <td class="order__status">${order.Status}</td>
            <td>
                <button class="order__detail" onclick="showOrderDetail(this)">Xem chi tiết</button>
                <div class="overlay">
                    <div class="order__detail-box">
                        <i class="fa-solid fa-rectangle-xmark close"></i>
                        <h2 class="order-detail-heading">
                            Các sản phẩm trong đơn
                        </h2>
                        <div class="order-detail-table-list">
                            <table class="order-detail-table">
                                <thead>
                                <tr>
                                    <th style="width: 20%">Mã sản phẩm</th>
                                    <th style="width: 50%">Sản phẩm</th>
                                    <th style="width: 20%">Đơn giá</th>
                                    <th style="width: 10%">Số lượng</th>
                                </tr>
                                </thead>
                                <tbody>` + productContent + `</tbody>
                                <tfoot>
                                <tr>
                                    <td colspan="4" class="totalPrice">
                                    Địa chỉ: ${order.Customer.Address}, Phường ${order.Customer.Ward}, Quận ${order.Customer.District}, ${order.Customer.City}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="totalPrice">
                                    Tổng cộng:
                                    <span class="total-price-value">${order.TotalPrice}</span><sup>đ</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="order-detail-status">
                                    <form style="background-color: #fff;">
                                          <label for="option-status-${order.ID}">Tình trạng:</label>
                                          <select id="option-status-${order.ID}" name="option-status" onchange="setOrderStatus(this)">
                                              <option value="cxl" ${cxlSelected}>Chưa xử lý</option>
                                              <option value="dxn" ${dxnSelected}>Đã xác nhận</option>
                                              <option value="dg" ${dgSelected}>Đã giao</option>
                                              <option value="dh" ${dhSelected}>Đã hủy</option>
                                        </select>
                                          <button type="submit" class="order__submit-status" onclick="submitStatus(this,event)" disabled>Xác nhận thay đổi</button>
                                    </form>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`;
    });
    document.querySelector(".order-table tbody").innerHTML = orderContent;
    setStatusColor();
}
addOrdertoTable();

function showOrderDetail(orderElement) {
    orderElement.parentElement.querySelector(".overlay").style.display = "block";
}
// Set Status
function setOrderStatus(statusElement) {
    const orderStatusSubmit = statusElement.parentElement.querySelector(
        ".order__submit-status"
    );
    orderStatusSubmit.disabled = false;
    orderStatusSubmit.style.opacity = 1;
}
function submitStatus(submitElement, event) {
    event.preventDefault();
    const orderStatusSubmit = submitElement.parentElement.querySelector(
        ".order__submit-status"
    );
    const selectElement = (statusElement =
        submitElement.parentElement.querySelector("select"));
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderDiv =
        submitElement.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.parentElement.parentElement.parentElement
            .parentElement;
    const orderID = orderDiv.querySelector(".order__id").innerText;
    const statusText =
        selectElement.options[statusElement.selectedIndex].innerText; // Lấy text của thẻ option đang được chọn
    for (let i = 0; i < orders.length; i++)
        if (orders[i].ID == orderID) {
            orders[i].Status = statusText;
            break;
        }
    orderDiv.querySelector(".order__status").innerText = statusText;
    localStorage.setItem("orders", JSON.stringify(orders));
    setStatusColor();
    alert("Đã cập nhật trạng thái thành công!");
    orderStatusSubmit.disabled = true;
    orderStatusSubmit.style.opacity = 0.5;
}
function setStatusColor() {
    const orderStatus = document.querySelectorAll(".order__status");
    for (let i = 0; i < orderStatus.length; i++) {
        if (orderStatus[i].innerText == "Chưa xử lý")
            orderStatus[i].style.color = "#565555";
        else if (orderStatus[i].innerText == "Đã xác nhận")
            orderStatus[i].style.color = "#4a81e1";
        else if (orderStatus[i].innerText == "Đã giao")
            orderStatus[i].style.color = "#00bb4bda";
        else if (orderStatus[i].innerText == "Đã hủy")
            orderStatus[i].style.color = "#ff0000da";
    }
}

//editCustomer
function editCustomer(customerElement) {
    // liệt kê các thông tin cần sửa trong form edit customer
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const divCustomer = customerElement.parentElement.parentElement;
    const id = divCustomer.querySelector(".customer__userID").innerText;
    const namefullField = document.getElementById("form__edit-fullname");
    const phoneField = document.getElementById("form__edit-phone");
    const addressField = document.getElementById("form__edit-address");
    const wardField = document.getElementById("form__edit-ward");
    const districtField = document.getElementById("form__edit-district");
    const cityField = document.getElementById("form__edit-city");

    for (let i = 0; i < users.length; i++) {
        if (users[i].UserId == id) { // nếu tìm được user cần sửa
            // gán dữ liệu cũ vào form
            namefullField.value = users[i].FullName;
            phoneField.value = users[i].Phone;
            addressField.value = users[i].Address;
            wardField.value = users[i].Ward;
            districtField.value = users[i].District;
            cityField.value = users[i].City;

            // khi bấm vào nút "sửa" thì lưu lại thông tin mới
            document
                .getElementById("form__edit-submit")
                .addEventListener("click", function (event) {
                    event.preventDefault();

                    users[i].FullName = namefullField.value;
                    users[i].Phone = phoneField.value;
                    users[i].City = cityField.value;
                    users[i].Address = addressField.value;
                    users[i].District = districtField.value;
                    users[i].Ward = wardField.value;

                    localStorage.setItem("users", JSON.stringify(users));

                    let customerContent = "";
                    customerContent += `<tr>
                  <td class="customer__userID">${users[i].UserId}</td>
                  <td class="customer__userName">${users[i].FullName}</td>
                  <td class="customer__userPhone">${users[i].Phone}</td>
                  <td class="customer__userAddress">${users[i].Address}, Phường ${users[i].Ward}, Quận ${users[i].District}, ${users[i].City}</td>
                  <td class="customer__userEmail">${users[i].Email}</td>
                  <td><button type="button" class="customer__status" title="Nhấp chuột để thay đổi trạng thái">Hoạt động</button></td>
                  <td>
                      <i class="fa-regular fa-pen-to-square edit-icon" onclick="editCustomer(this)"></i>
                  </td>
                  <td class="customer__userdistrict" style="display: none;">${users[i].District}</td>
                  <td class="customer__usercity" style="display: none;">${users[i].City}</td>
                  <td class="customer__userward" style="display: none;">${users[i].Ward}</td>
              </tr>`;

                    divCustomer.innerHTML = customerContent;
                    // Close the modal
                    document.querySelector(".admin__edit").style.display = "none";
                });
            break;
        }
    }

    // Show the edit modal
    document.querySelector(".admin__edit").style.display = "block";

}
function showDetailProductAdmin(btnElement) {
    btnElement.parentElement.querySelector(".detail-admin").style.display = 'block'
}
function showPaymentProduct(paymentElement) {
    paymentElement.parentElement.querySelector(".overlay").style.display = "block";
}