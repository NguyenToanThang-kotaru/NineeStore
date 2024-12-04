//---------------------------------None Block Register & Login-------------------------
const homePage = document.querySelector("#home-page");
const registerbtn = document.querySelectorAll(".register-btn");
const loginPage = document.querySelector(".login-page");
const registerPage = document.querySelector(".register-page");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
const closeRegis = document.querySelectorAll(".esc-register");
const registerSuccess = document.querySelector(".register-success")


registerbtn.forEach((register) => {
  register.addEventListener("click", (e) => {
    e.preventDefault();
    registerPage.style.display = "block";
    loginPage.style.display = "none";
    document.getElementById("fullname").focus();
  });
});

const loginbtn = document.querySelectorAll(".login-btn");
loginbtn.forEach((login) => {
  login.addEventListener("click", (e) => {
    e.preventDefault();
    registerSuccess.style.display = "none"
    registerPage.style.display = "none";
    clearInput();
    loginPage.style.display = "block";
    document.getElementById("email-login").focus();
  });
});

function closeRL(closeElement) {
  closeElement.parentElement.parentElement.style.display = "none";
  clearInput();
}

function clearInput() {
    document.querySelector("#username").value="";
  document.querySelector("#email").value="";
    document.querySelector("#password").value="";
    document.querySelector("#re-password").value="";
  document.querySelector("#fullname").value="";
  document.querySelector("#phone").value="";
    document.querySelector("#address").value="";
    document.querySelector("#ward").value="";
    document.querySelector("#district").value="";
    document.querySelector("#city").value="";
  document.querySelector(".form-register").value="";
  }

function scrollHead() {
  // Quay ve dau trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// --------------------------- showCartBox ----------
function displayCart() {
  document.querySelector(".cart-page").style.display = "block";
}
function toggleMenu() {
    const menudacap = document.querySelector('.menudacap-mobile');
    menudacap.classList.toggle('open'); 
  }
  function toggleOverlayNav(){
    const overlayNav = document.querySelector('.overlay-nav')
    const menuList = document.querySelector('.mobile-menu')
    overlayNav.classList.toggle('show')
    menuList.classList.toggle('show')
  }