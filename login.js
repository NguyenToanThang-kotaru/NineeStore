const adminAccount = {
  UserName: "admin",
  Password: "admin123",
  UserType: "admin"
};



const loginSubmit = document.querySelector(".login-submit");
loginSubmit.addEventListener("click", (event) => {
  const userLocalLogin = JSON.parse(localStorage.getItem("users")) || [];
  const emailLogin = document.getElementById("email-login");
  const passwordLogin = document.getElementById("password-login");
  event.preventDefault();
  console.log("sad")
  if (
    adminAccount.UserName === emailLogin.value &&
    adminAccount.Password === passwordLogin.value
  ) {
    setTimeout(
      (document.querySelector(".login-success").style.display = "block"),
      3000
    );
    document.querySelector(".login-error").style.display = "none";
    localStorage.setItem("userLogin", JSON.stringify(adminAccount));
    isLogin = true;
  } else {
    const findUser = userLocalLogin.find(
      (user) =>
        (user.UserName === emailLogin.value ||
          user.Email === emailLogin.value) &&
        user.Password === passwordLogin.value
    );
    if (!findUser) {
      document.querySelector(".login-error").style.display = "block";
    } else {
      const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
      let isLock = false;
      userLock.forEach((user) => {
        if (user === emailLogin.value) isLock = true;
      });
      if (isLock == true) alert("Tài khoản đang bị khóa");
      else {
        setTimeout(
          (document.querySelector(".login-success").style.display = "block"),
          3000
        );
        document.querySelector(".login-error").style.display = "none";
        localStorage.setItem("userLogin", JSON.stringify(findUser));
        isLogin = true;
      }
    }
  }
});
var isLogin = localStorage.getItem("userLogin") ? true : false;
function reloadPage() {
  window.location.href = "Nineshop.html";
}
if (isLogin) {
  document.querySelector("li.login-btn").style.display =
    "none";
  document.querySelector("li.register-btn").style.display =
    "none";
  if (isAdmin) {
    document.querySelector(".admin-item").style.display = "block";
  }
} else {
  document.querySelector("li.info-btn").style.display =
    "none";
  document.querySelector("li.logout-btn").style.display =
    "none";
}
function logOut() {
  localStorage.removeItem("userLogin");
  isLogin = false;
  isAdmin = false;
  window.location.href = "Nineshop.html";
}