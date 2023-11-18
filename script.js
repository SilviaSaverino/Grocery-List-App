
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    inputField.value =""
    push(myGroceryListInDB, inputValue)
    groceryListEl.innerHTML += `<li>${inputValue}</>`
})

