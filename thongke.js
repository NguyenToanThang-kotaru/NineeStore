const menu = document.querySelector('#menu-tke');
const item_btn = document.querySelector('#items-btn');
const customer_btn = document.querySelector('#customers-btn');
const back1 = document.querySelector('#back-btn-mh');
const back2 = document.querySelector('#back-btn-kh');
const item_page = document.querySelector('#items-tke');
const customer_page = document.querySelector('#customers-tke');

customer_btn.addEventListener('click',showCustomer);
item_btn.addEventListener('click',showItems);
back1.addEventListener('click',backMenu);
back2.addEventListener('click',backMenu)

function showCustomer(){
    customer_page.style.display = "block";
    menu.style.display = "none";
}

function showItems(){
    item_page.style.display = "block";
    menu.style.display = "none";
}

function backMenu(){
    customer_page.style.display = "none";
    item_page.style.display = "none";
    menu.style.display = "block";
}

// Hoa don

const hoadon_kh_btn = document.querySelectorAll('.show-hoadon-kh');
const hoadon_mh_btn = document.querySelectorAll('.show-hoadon-mh');
const hoadon_kh_page = document.querySelector('#hoadon-customers');
const hoadon_mh_page = document.querySelector('#hoadon-items');
const esc_hoadon1 = document.querySelector('#esc-hoadon-btn-kh');
const esc_hoadon2 = document.querySelector('#esc-hoadon-btn-mh');
const overlay = document.querySelector('.overlay-hd');

hoadon_kh_btn.forEach(button =>{
    button.addEventListener('click',showHoaDonKH);
});

hoadon_mh_btn.forEach(button =>{
    button.addEventListener('click',showHoaDonMH);
});

esc_hoadon1.addEventListener('click',closeHoadonKH);
esc_hoadon2.addEventListener('click',closeHoadonMH);

function showHoaDonKH(){
    overlay.style.display = "block";
    hoadon_kh_page.style.display = "block";
}

function showHoaDonMH(){
    overlay.style.display = "block";
    hoadon_mh_page.style.display = "block";
}

function closeHoadonMH(){
    overlay.style.display = "none";
    hoadon_mh_page.style.display = "none";
}

function closeHoadonKH(){
    overlay.style.display = "none";
    hoadon_kh_page.style.display = "none";
}