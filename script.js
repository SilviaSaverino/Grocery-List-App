
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://grocery-6651f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const myGroceryListInDB = ref(database, "groceryList")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const groceryListEl = document.getElementById("grocery-list")


addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    clearInputFieldValue()
    push(myGroceryListInDB, inputValue)
})

onValue(myGroceryListInDB, function(snapshot) {
    let itemsInDB = Object.entries(snapshot.val())
    clearGroceryListEl()
    for (let i = 0; i < itemsInDB.length; i++){
        let currentItem = itemsInDB[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemIntoGroceryListEl(currentItem)
    }  
})

function clearGroceryListEl() {
    groceryListEl.innerHTML = ""
}

function appendItemIntoGroceryListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    groceryListEl.append(newEl)
}

function clearInputFieldValue() {
    inputField.value =""
}

