let inputName = document.getElementById("inputName")
let inputEmail = document.getElementById("inputEmail")
let inputPass = document.getElementById("inputPassword")
let inputEmailLogin = document.getElementById("inputEmailLogin")
let inputPasswordLogin = document.getElementById("inputPasswordLogin")
let storageAcc = [];
if (localStorage.getItem("accContainer") !== null) {
    storageAcc = JSON.parse(localStorage.getItem("accContainer"));
}
function addAcc() {
if(
    validationInputs(inputName ,"nameMess")&&
    validationInputs(inputEmail , "emailMess")&&
    validationInputs(inputPass , "passMess")
){
    let inputsData = {
        Name: inputName.value,
        Email: inputEmail.value,
        Password: inputPass.value
    };
    if (storageAcc.some(acc => acc.Name === inputsData.Name || acc.Email === inputsData.Email || acc.Password === inputsData.Password)) {
        Swal.fire("This account already exists!");
    }
    else {
        storageAcc.push(inputsData)
        localStorage.setItem("accContainer", JSON.stringify(storageAcc))
        Swal.fire("Account added successfully!")
        clearForm()
    }
}
}
function logIn() {
    let inputsData = {
        Email: inputEmailLogin.value,
        Password: inputPasswordLogin.value
    };
    let storedAccounts = localStorage.getItem("accContainer");
    let storageAcc = storedAccounts ? JSON.parse(storedAccounts) : [];

    let user = storageAcc.find(acc => acc.Email === inputsData.Email && acc.Password === inputsData.Password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        // window.open('loged.html', '_blank');
        window.location.href='loged.html';
    }
    else {
        Swal.fire("This account is not exists!")
    }
}
function welcome() {
    let currentUser = (localStorage.getItem("currentUser"))
    if (currentUser) {
        let parsedAccounts = JSON.parse(currentUser)
     let welcomeMessElement =   document.getElementById("welcomeMess")
     if(welcomeMessElement){
welcomeMessElement.innerHTML = `
<h1 class="text-center fw-bolder">
welcome ${parsedAccounts.Name}
</h1>`
     }
 
    }
}
welcome();

function clearForm() {
    inputName.value = null;
    inputEmail.value = null;
    inputPass.value = null;
inputName.classList.remove("is-valid")
inputEmail.classList.remove("is-valid")
inputPass.classList.remove("is-valid")
}


function validationInputs(element , messId){
    let text =element.value;
    let regex={
        inputName:/^[a-zA-Z]{3,}$/,
        inputEmail:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        inputPassword:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    }
   let message= document.getElementById(messId)
    if(regex[element.id].test(text) ===true){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        message.classList.add("d-none")

return true
}
else{
    element.classList.add("is-invalid")
element.classList.remove("is-valid")
message.classList.remove("d-none")
return false
}
}

document.addEventListener("keydown",function(e){
if(e.key==="Enter"){
if(inputEmailLogin&&inputPasswordLogin){
    logIn()
}
else if(inputEmail&&inputName&&inputPass){
addAcc()

}
}
})