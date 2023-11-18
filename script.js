
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://grocery-6651f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")

addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    console.log(inputValue)
})