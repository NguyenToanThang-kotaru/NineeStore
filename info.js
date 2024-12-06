function showInfo() {
    innerInfo();
    document.querySelector(".info-account").style.display = "block";
}
function innerInfo() {
    const infoTable = document.querySelector(".info-table");
    const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
    if (userLogin.UserType == "admin") infoTable.innerHTML = `Bạn đang là Admin`;
    else {
        infoTable.innerHTML = `<tr>
                <td>Họ và tên:</td>
                <td>${userLogin.FullName}</td>
              </tr>
              <tr>
                <td>Tên đăng nhập:</td>
                <td>${userLogin.UserName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>${userLogin.Email}</td>
              </tr>
              <tr>
                <td>Số điện thoại:</td>
                <td>${userLogin.Phone}</td>
              </tr>
              <tr>
                <td>Địa chỉ:</td>
                <td>${userLogin.Address}</td>
              </tr>`;
    }
}
// -------------------------------- OrderHistory ------------------------------
function addToHistory() {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderLogin = [];
    orders.forEach((order) => {
        if (userLogin.UserId == order.Customer.UserId) orderLogin.push(order);
    });
    const historyTableList = document.querySelector(".history-table-list");
    let tableContent = "";
    orderLogin.forEach((order, index) => {
        let theadcontent = "";
        let tbodycontent = "";
        let tfootcontent = "";
        const addthead = document.createElement("thead");
        const addtbody = document.createElement("tbody");
        const addtfoot = document.createElement("tfoot");
        // ----------------------thead---------------------
        theadcontent = `
            <thead>
            <tr><td colspan="3" class="history-order-id">Đơn hàng ${index + 1
            }:</td></tr>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
              </tr>
            </thead>`;
        addthead.innerHTML = theadcontent;
        // historyBox.append(addthead);
        // ----------------------tbody---------------------
        order.ProductList.forEach((product) => {
            tbodycontent =
                tbodycontent +
                `<tr>
                <td>
                  <img src="${product.Img}" class="history-order-img">
                  <span class="history-order-name">${product.Name}</span>
                </td>
                <td><span class="history-order-price">${product.Price}</span><sup>đ</sup></td>
                <td class="history-order-quantity">${product.Quantity}</td>
              </tr>`;
        });
        addtbody.innerHTML = tbodycontent;
        // historyBox.append(addtbody);
        // ----------------------tfoot---------------------
        tfootcontent = `<tfoot>
              <tr>
                <td colspan="3" class="totalPrice">Tổng cộng: <span class="total-price-value">${order.TotalPrice}</span><sup>đ</sup></td>
              </tr>
              <tr>
                <td colspan="3" class="history-order-status">Tình trạng: <span class="history-order-status-text">${order.Status}</span></td>
              </tr>
            </tfoot>`;
        addtfoot.innerHTML = tfootcontent;
        tableContent =
            tableContent +
            '<table class="history-table">' +
            theadcontent +
            tbodycontent +
            tfootcontent +
            "</table>";
    });
    historyTableList.innerHTML = tableContent;
    checkHistoryEmpty();
}
function checkHistoryEmpty() {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const historyEmpty = document.querySelector(".history-empty");
    const orders = userLogin.OrderHistory;
    if (orders) {
        historyEmpty.style.display = "none";
    } else {
        historyEmpty.style.display = "block";
    }
}
function showHistory() {
    addToHistory();
    setStatusColorinUser();
    document.querySelector(".history-page").style.display = "block";
}

function setStatusColorinUser() {
    const orderStatus = document.querySelectorAll(".history-order-status-text");
    for (let i = 0; i < orderStatus.length; i++) {
        if (orderStatus[i].innerText == "Chưa xử lý")
            orderStatus[i].style.color = "#565555";
        else if (orderStatus[i].innerText == "Đã xác nhận")
            orderStatus[i].style.color = "#4a81e1";
        else if (orderStatus[i].innerText == "Đã giao thành công")
            orderStatus[i].style.color = "#00bb4bda";
        else if (orderStatus[i].innerText == "Đã hủy")
            orderStatus[i].style.color = "#ff0000da";
    }
}
