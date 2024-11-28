const adminAccount = {
  UserName: "admin",
  Password: "admin123",
  UserType: "admin"
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
      document.querySelector("#loginFromadmin").style.display="none"
      document.querySelector(".image__cannot-go-in").style.display="none"
      document.querySelector(".admin__page").style.display = "block";    
      reloadPage()  
    }
    else
    {
        alert("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu")
    }
});
function reloadPage() {
    window.location.href = "admin.html";
  }