const adminAccount = {
    UserId: Math.ceil(Math.random() * 10000000000),
    UserName: "admin",
    Password: "admin123",
    UserType: "admin",
    FullName: "Admin",
    Phone: "0123456789",
    Address: `273 An Dương Vương, Phường 3, Quận 5, TPHCM`,
    Email: "adminNineStore@gmail.com",
    OrderHistory: [],
    UserType: "admin"
};
const loginSubmit = document.querySelector(".login-submit");
loginSubmit.addEventListener("click", (event) => {
    const userLocalLogin = JSON.parse(localStorage.getItem("users")) || [];
    let count = 0;
    for (user of userLocalLogin) {
        if (user.UserType == "admin") {
            count++;
        }
    }

    if (count == 0) {
        userLocalLogin.push(adminAccount);
        localStorage.setItem("users", JSON.stringify(userLocalLogin));
    }
    const emailLogin = document.getElementById("email-login");
    const passwordLogin = document.getElementById("password-login");
    event.preventDefault();
    // Duyệt User và Admin trong localStorage
    const findUser = userLocalLogin.find(
        (user) =>
            user.UserType == "user" && (user.UserName === emailLogin.value || user.Email === emailLogin.value) &&
            user.Password === passwordLogin.value
    );

    const findAdmin = userLocalLogin.find(
        (admin) =>
            admin.UserType == "admin" &&
            (admin.UserName === emailLogin.value ||
                admin.Email === emailLogin.value) &&
            admin.Password === passwordLogin.value
    );

    if (!findUser && !findAdmin) {
        document.querySelector(".login-error").style.display = "block";
    } else {
        const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
        let isLock = false;
        userLock.forEach((user) => {
            if (user === emailLogin.value) isLock = true;
        });
        if (isLock == true) alert("Tài khoản đang bị khóa");
        else if (findUser) {
            setTimeout(function () {
                document.querySelector(".login-success").style.display = "block";
            }, 500);
            document.querySelector(".login-error").style.display = "none";
            localStorage.setItem("userLogin", JSON.stringify(findUser));
            isLogin = true;
            setTimeout(reloadPage, 3000);
        } else {
            setTimeout(function () {
                document.querySelector(".login-success").style.display = "block";
            }, 500);
            document.querySelector(".login-error").style.display = "none";
            localStorage.setItem("userLogin", JSON.stringify(findAdmin));
            isLogin = true;
            setTimeout(function () {
                window.location.href = "admin.html";
            }, 3000);
        }
    }
});
var isLogin = localStorage.getItem("userLogin") ? true : false;
function reloadPage() {
    window.location.href = "Nineshop.html";
}
if (isLogin) {
    document.querySelector("li.login-btn").style.display = "none";
    document.querySelector("li.register-btn").style.display = "none";
    document.querySelector(".order-history-btn").style.display = "block";
    if (JSON.parse(localStorage.getItem("userLogin")).UserType == "admin") {
        document.querySelector(".order-history-btn").style.display = "none";
    }
} else {
    document.querySelector("li.info-btn").style.display = "none";
    document.querySelector("li.logout-btn").style.display = "none";
}
function logOut() {
    localStorage.removeItem("userLogin");
    isLogin = false;
    isAdmin = false;
    window.location.href = "Nineshop.html";
}