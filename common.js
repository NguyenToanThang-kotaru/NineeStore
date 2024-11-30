// -------------------------------- hidden Orverlay ------------------------------
function hideOverlay() {

  //ẩn cửa sổ sau khi click bên ngoài cửa sổ nổi
  const overlayArr = document.querySelectorAll(".overlay");
  overlayArr.forEach((overlays) => {
    overlays.addEventListener("click", (event) => {
      if (event.target === overlays) overlays.style.display = "none";
    });
  });
  //ẩn cửa sổ khi ấn vào dấu X
  const closes = document.querySelectorAll(".close");
  closes.forEach((closebtn) => {
    closebtn.addEventListener("click", () => {
      closebtn.parentElement.parentElement.style.display = "none";
    });
  });
}
hideOverlay();
function reloadPage() {
  window.location.href = "Nineshop.html";
}
