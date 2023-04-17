

let authArray = [];
authArray = JSON.parse(localStorage.getItem('AuthDetails'));

document.getElementById('reg-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let regName = document.getElementById('username').value;
    let regEmail = document.getElementById('useremail').value;
    let regPassword = document.getElementById('userpassword').value;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regEmail.value.match(validRegex)) {
        alert("Invalid email address!");
    }
    let authDetails = {
        userName: regName,
        userEmail: regEmail,
        userPassword: regPassword
    }
    authArray.push(authDetails);
    localStorage.setItem('AuthDetails', JSON.stringify(authArray))
    alert("Account Created");
    regName.value = regEmail.value = regPassword.value = '';
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let inputEmail = document.getElementById('loginemail').value;
    let inputPassword = document.getElementById('loginpassword').value;

    let result = authArray.map((item) => {
        if (item.userEmail === inputEmail && item.userPassword === inputPassword) {
            return true
        } else {
            return false
        }
    })
    console.log("Result: ", result)

    if (result.includes(true)) {
        alert("Validated!!!")
    } else {
        alert("Invalid")
    }
});