const adminAccount = {
    UserName: "admin",
    Password: "admin123",
    UserType: "admin",
};
const loginSubmit = document.querySelector(".login-submit");
loginSubmit.addEventListener("click", (event) => {
    const userLocalLogin = JSON.parse(localStorage.getItem("users")) || [];
    const adminLocalLogin = JSON.parse(localStorage.getItem("admins")) || [];
    const emailLogin = document.getElementById("email-login");
    const passwordLogin = document.getElementById("password-login");
    event.preventDefault();
    // Nếu đăng nhập bằng tài khoản admin mặc định
    if (adminAccount.UserName === emailLogin.value &&
        adminAccount.Password === passwordLogin.value
    ) {
        setTimeout((document.querySelector(".login-success").style.display = "block"), 3000);
        document.querySelector(".login-error").style.display = "none";
        localStorage.setItem("userLogin", JSON.stringify(adminAccount));
        isLogin = true;
    } 
    else { // Duyệt User và Admin trong localStorage
        const findUser = userLocalLogin.find((user) => (
            user.UserName === emailLogin.value ||
            user.Email === emailLogin.value) &&
            user.Password === passwordLogin.value
        );

        const findAdmin = adminLocalLogin.find((admin) => (
            admin.UserName === emailLogin.value ||
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
                setTimeout(
                    (document.querySelector(".login-success").style.display = "block"),
                    3000
                );
                document.querySelector(".login-error").style.display = "none";
                console.log(findUser);
                localStorage.setItem("userLogin", JSON.stringify(findUser));
                isLogin = true;
            }
            else {
                setTimeout(
                    (document.querySelector(".login-success").style.display = "block"),
                    3000
                );
                document.querySelector(".login-error").style.display = "none";
                console.log(findAdmin);
                localStorage.setItem("userLogin", JSON.stringify(findAdmin));
                isLogin = true;
            }
        }
    }
});
var isLogin = localStorage.getItem("userLogin") ? true : false;
function reloadPage() {
    window.location.href = "Nineshop.html";
}
function reloadAdminPage() {
    window.location.href = "admin.html";
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
