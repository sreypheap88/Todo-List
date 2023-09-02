const containerDialoge = document.querySelector(".container-dialog")
const addUser = document.querySelector("#add-user")
const header = document.querySelector("#header2")
// console.log(header)

const containerCard = document.querySelector(".container-card")
const fullName = document.querySelector("#full-name")
const age = document.querySelector("#age")
const gender = document.querySelector("#gender")

// form dialoge 
function show(e){
    e.style.display = "block"
}
function hide(e){
    e.style.display = "none"
}
function onAddButton(){
    addUser.textContent = "Create" //btn create 
    header.textContent = "Form Create User" //header of dialoge create form
    document.querySelector("#full-name").value = ""
    document.querySelector("#gender").value = ""
    document.querySelector("#age").value = ""
    show(containerDialoge) // show dialoge create form when user click btn 
}

// hide dialoge when user click cancel 
function onCancel(event){
    event.preventDefault()
    hide(containerDialoge)
}

let users = [
    {fullName:"kkkkk",gender:"Dress for girl free size",age: 45},
]
// store users in localStorage 
function storageUser(){
    localStorage.setItem("users", JSON.stringify(users))
}

// get users from localstorage
function loadUser(){
    let store = JSON.parse(localStorage.getItem("users"))
    if(store !== null){
        users = store
    }
    else{
        localStorage.removeItem("users")
    }
}

// function loop card 
function loopCard(){
    loadUser()
    containerCard.innerHTML = "" //Clear the containerCard element if don't do this it will loop old card to display
    for (let index = 0; index<users.length; index++){
        let card = document.createElement("div")
        card.className = "card"

        //study condition gender
        let img = document.createElement("img");
        if (users[index].gender === "male") {
          img.src = "images/male.png";
        } else {
          img.src = "images/female.png";
        }

        let name = document.createElement("h3")
        name.textContent = users[index].fullName

        let age = document.createElement("h3")
        age.textContent = users[index].age

        let btn = document.createElement("div")
        btn.className = "btn"

        let btnEdit = document.createElement("button")
        btnEdit.className = "edit"
        btnEdit.textContent = "edit"
        // call function editCard 
        btnEdit.addEventListener("click", editCard)

        let btnDelete = document.createElement("button")
        btnDelete.className = "delete"
        btnDelete.textContent = "delete"
        //call function deleteCard
        btnDelete.addEventListener("click",deleteCard)

        // appendChild 
        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(age)
        card.appendChild(btn)
        btn.appendChild(btnEdit)
        btn.appendChild(btnDelete)
        containerCard.appendChild(card)
    }
}

// function create user 
let userIndex = null
function createUser(event){
    event.preventDefault()
    if(document.querySelector("#full-name").value !="" && document.querySelector("#gender").value !="" && document.querySelector("#age").value !=""){
        if(userIndex !==null){
            let edit = users[userIndex]
            edit.fullName = document.querySelector("#full-name").value
            edit.gender = document.querySelector("#gender").value
            edit.age = document.querySelector("#age").value
        }
        else{
            let newUser = {}
            newUser.fullName = document.querySelector("#full-name").value
            newUser.gender = document.querySelector("#gender").value
            newUser.age = document.querySelector("#age").value
            // unshift==push but it take new create on the top 
            users.unshift(newUser)
        }
        hide(containerDialoge)
        storageUser()
        loopCard()
    }
    else{
        alert("You need field all input")
    }
}

//mix idea with AI 2 line
function deleteCard(event) {
    event.preventDefault();
    // let index = event.target.parentElement.parentElement.dataset.index (old line)
    let card = event.target.closest(".card");  //new line
    let index = Array.from(containerCard.children).indexOf(card); //new line
    users.splice(index, 1);
    storageUser();
    loopCard();
}

// edit user card 
function editCard(event) {
    show(containerDialoge);
    // Get the index of the clicked card
    let card = event.target.closest(".card");
    let index = Array.from(containerCard.children).indexOf(card);
    userIndex = index;
    // Retrieve the user object to edit
    let editUser = users[index];
    // Populate the form fields with the user data
    fullName.value = editUser.fullName;
    gender.value = editUser.gender;
    age.value = editUser.age;
    addUser.textContent = "Save"; //change btn create to save
    header.textContent = "Form Edit User"; //change header 
}
loadUser()
loopCard()