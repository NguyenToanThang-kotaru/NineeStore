const adminAccount = {
  UserName: "admin",
  Password: "admin123",
  UserType: "admin",
};

const loginFromAdmin = document.querySelector("#login-from-admin");
loginFromAdmin.addEventListener("click", (event) => {
  event.preventDefault();
  const emailLogin = document.getElementById("email-login");
  const passwordLogin = document.getElementById("password-login");

  if (
    adminAccount.UserName === emailLogin.value &&
    adminAccount.Password === passwordLogin.value
  ) {
    localStorage.setItem("userLogin", JSON.stringify(adminAccount));
    document.querySelector("#loginFromadmin").style.display = "none";
    document.querySelector(".form__cannot-go-in").style.display = "none";
    document.querySelector(".admin__page").style.display = "block";
    reloadPage();
  } else {
    const users = JSON.parse(localStorage.getItem("users"));
    const admins = JSON.parse(localStorage.getItem("admins"));
    let isUser = false;
    for (let user of users) {
      if (
        user.UserType === "admin" &&
        user.UserName === emailLogin.value &&
        user.Password === passwordLogin.value
      ) {
        localStorage.setItem("userLogin", JSON.stringify(user));
        document.querySelector("#loginFromadmin").style.display = "none";
        document.querySelector(".form__cannot-go-in").style.display = "none";
        document.querySelector(".admin__page").style.display = "block";
        isUser = true;
        reloadPage();
        return;
      }
    }

    if (!isUser) {
      for (let admin of admins) {
        if (
          admin.UserType === "admin" &&
          admin.UserName === emailLogin.value &&
          admin.Password === passwordLogin.value
        ) {
          localStorage.setItem("userLogin", JSON.stringify(admin));
          document.querySelector("#loginFromadmin").style.display = "none";
          document.querySelector(".form__cannot-go-in").style.display = "none";
          document.querySelector(".admin__page").style.display = "block";
          reloadPage();
          return;
        }
      }
    }
    alert("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
  }
});
function reloadPage() {
  window.location.href = "admin.html";
}
