const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repassword = document.querySelector("#re-password");
const fullname = document.querySelector("#fullname");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const ward = document.querySelector("#ward");
const district = document.querySelector("#district");
const city = document.querySelector("#city");
const formRegister = document.querySelector(".form-register");

// Lấy dữ liệu từ localStorage
function showError(e, message) {
    let parentInput = e.parentElement;
    let errorText = parentInput.querySelector("p");
    e.classList.add("error");
    errorText.innerText = message;
}
function showSuccess(e) {
    let parentInput = e.parentElement;
    let errorText = parentInput.querySelector("p");
    e.classList.remove("error");
    errorText.innerText = "";
}

function checkEmptyError(input) {
    let isEmptyError = false;
    input.value = input.value.trim();
    if (!input.value) {
        isEmptyError = true;
        showError(input, "Không được để trống");
    } else {
        showSuccess(input);
    }
    return isEmptyError;
}

function checkFullnameError(input) {
    let isFullnameError = false;
    if (fullname.value.match(/\d+/)) { // if there are digits in the fullname
        isFullnameError = true;
        showError(input, "Tên không được chứa số");
        return isFullnameError;
    }
    else if (fullname.value.match(/[~!@#$%^&*()_+-={}|\\:";'<>?.//`]/)) {
        isFullnameError = true;
        showError(input, "Tên không được chứa ký tự đặc biệt");
        return isFullnameError;
    }
}

function checkPhoneError(input) {
    let isPhoneSameError = false;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    for (let user of users) {
        if (user.Phone == input.value) {
            isPhoneSameError = true;
            showError(input, "Số điện thoại đã được sử dụng");
            break;
        }
    }
    return isPhoneSameError;
}

function checkLengthError(input, min) {
    input.value = input.value.trim();
    let isLengthError = input.value.length < min;
    if (isLengthError) {
        showError(input, `Phải có ít nhất ${min} ký tự`);
    }
    return isLengthError;
}

function checkLengthMaxError(input, num) {
    input.value = input.value.trim();
    let isLengthError = input.value.length < num;
    let isLengthMaxError = input.value.length > num;
    if (isLengthError) {
        showError(input, `Phải có ít nhất ${min} ký tự`);
        return isLengthError;
    }
    else if (isLengthMaxError) {
        showError(input, `Không được vượt quá ${num} ký tự`);
        return isLengthMaxError;
    }
}

function checkEmailError(input) {
    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim();
    let isEmailError = !regexEmail.test(input.value);
    let isEmailSame = false;
    const usersLocal = JSON.parse(localStorage.getItem("users")) || [];
    usersLocal.forEach((user) => {
        if (user.Email === input.value) isEmailSame = true;
    });
    if (!isEmailError && !isEmailSame) {
        showSuccess(input);
    } else {
        if (isEmailError) {
            showError(input, "Email không hợp lệ");
        } else {
            showError(input, "Email này đã được đăng ký");
        }
    }
    return isEmailError || isEmailSame;
}
function checkUserNameError(input) {
    let isUserNameSame = false;

    if (!input.value.match(/[a-zA-Z0-9]/) || (/^\d+$/).test(input.value)) {
        showError(input, "Username không được chứa toàn số và kí tự đặc biệt");
    }
    else {
        const usersLocal = JSON.parse(localStorage.getItem("users")) || [];
        for (let user of usersLocal) {
            if (user.UserName === input.value) {
                isUserNameSame = true;
                break;
            }
        }
        if (!isUserNameSame) {
            showSuccess(input);
        } else {
            showError(input, "Tên đăng nhập này đã được đăng ký");
        }
        return isUserNameSame;    
    }
}
function checkMatchPasswordError(passwordInput, rePasswordInput) {
    if (passwordInput.value !== rePasswordInput.value)
        showError(rePasswordInput, "Mật khẩu không khớp");
    return passwordInput.value !== rePasswordInput.value;
}
formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFullNameEmptyError = checkEmptyError(fullname);
    let isPhoneEmptyError = checkEmptyError(phone);
    let isFullnameError = checkFullnameError(fullname);
    let isPhoneSameError = checkPhoneError(phone);
    let isAddressEmptyError = checkEmptyError(address);
    let isWardEmptyError = checkEmptyError(ward);
    let isDistrictEmptyError = checkEmptyError(district);
    let isCityEmptyError = checkEmptyError(city);
    let isUsernameEmptyError = checkEmptyError(username);
    let isEmailEmptyError = checkEmptyError(email);
    let isPasswordEmptyError = checkEmptyError(password);
    let isRepasswordEmptyError = checkEmptyError(repassword);

    let isUsernameLengthError = true;
    let isPasswordLengthError = true;
    let isPhoneLengthError = true;
    let isEmailError = true;
    let isMatchError = true;
    if (!isUsernameEmptyError && !checkUserNameError(username)) {
        isUsernameLengthError = checkLengthError(username, 5);
    }
    if (!isEmailEmptyError) {
        isEmailError = checkEmailError(email);
    }
    if (!isPasswordEmptyError) {
        isPasswordLengthError = checkLengthError(password, 8);
    }
    if (!isPhoneEmptyError) {
        isPhoneLengthError = ((checkLengthError(phone, 10) || checkLengthMaxError(phone, 10)) ? true : false);
    }
    if (!isRepasswordEmptyError) {
        isMatchError = checkMatchPasswordError(password, repassword);
    }
    if (
        isEmailError ||
        isUsernameLengthError ||
        isMatchError ||
        isPasswordLengthError ||
        (isPhoneLengthError || isPhoneSameError) ||
        (isFullNameEmptyError || isFullnameError) ||
        isAddressEmptyError ||
        isWardEmptyError ||
        isDistrictEmptyError ||
        isCityEmptyError
    ) {
        // do nothing
    }
    else {
        // check if fullname & phone has issue
        setTimeout(function () {
            document.querySelector(".register-success").style.display = "block";
        }, 500);
        const user = {
            UserId: Math.ceil(Math.random() * 10000000000),
            FullName: fullname.value,
            Phone: phone.value,
            Address: address.value,
            Ward: ward.value,
            District: district.value,
            City: city.value,
            UserName: username.value,
            Email: email.value,
            Password: password.value,
            OrderHistory: [],
            UserType: "customer"
        };
        userLocal.push(user);
        localStorage.setItem("users", JSON.stringify(userLocal));    
    }
});
