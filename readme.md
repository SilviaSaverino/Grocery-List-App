# Grocery List 'App'

### Overview
The Grocery List 'App' is a simple web application that allows users to create and manage their grocery lists. Users can add items to the list, and the application will store the list in a Firebase Realtime Database. The interface is designed to be user-friendly and visually appealing.

![screenshot of Grocery List 'app'](/assets/images/GroceryList.png)

### Features
- Add Items: Users can add items to their grocery list by entering the item in the input field and clicking the "Add to cart" button.

- Dynamic List Display: The app dynamically displays the grocery list in the UI. Each item is presented in a visually appealing manner.

- Realtime Database: The app utilizes Firebase Realtime Database to store and retrieve the grocery list. This enables users to access their list from different devices.

- Remove Items: Users can remove items from the list by clicking on the item. This action updates the database in real-time.

### Technologies Used
HTML: The structure of the web page.
CSS: Styling for an attractive and responsive design.
JavaScript (ES6+): Logic for handling user interactions and managing the grocery list.

## Firebase Integration and overview
The app integrates with Firebase to provide a reliable backend for storing and managing grocery lists. Firebase Realtime Database is used for its real-time synchronization and ease of use.

### Firebase Modules Used:
- initializeApp: Initializes the Firebase app with the provided configuration.

- getDatabase: Retrieves a reference to the Firebase Realtime Database.

- ref: Creates a reference to a specific location in the database, in this case, the "groceryList" node.

- push: Adds a new item to the database.

- onValue: Listens for changes in the database and triggers a callback function when data is updated.

- remove: Removes an item from the database.

### Firebase Setup
1) Create a Firebase project at Firebase Console.

2) Obtain the Firebase configuration object.

3) Replace the firebaseConfig object in script.js with your own configuration.

    const appSettings = {
        databaseURL: "YOUR_DATABASE_URL"
    };

### Application Flow
Enter the name of the grocery item in the input field.

Click the "Add to cart" button to add the item to the list.

View the dynamically updated grocery list on the page.

To remove an item, click on the item in the list.

## Overview on JavaScript Methods used
- addButton.addEventListener
Listens for a click event on the "Add to cart" button.

- Retrieves the value from the input field, pushes it to the Firebase database, and clears the input field.

- onValue
Listens for changes in the database.

If items exist, clears the current grocery list on the UI and dynamically appends the updated items.

If no items exist, displays a message indicating an empty list.

- clearGroceryListEl
Clears the HTML content of the grocery list element.

- appendItemIntoGroceryListEl
Appends a new <li> element to the grocery list for each item in the database.
Assigns a click event to each item for easy removal.

- clearInputFieldValue
Clears the value of the input field after adding an item.

## Bug report and fixes :
- Whenever an item was deleted from the database, the list refreshed. However it would render both the old and new items together without removing the old one.

    onValue(myGroceryListInDB, function(snapshot) {
        let itemsInDB = Object.values(snapshot.val())
        for (let i = 0; i < itemsInDB.length; i++){
            appendItemIntoGroceryListEl(itemsInDB[i])
        }  
    })

![screenshot of double rendered list](/assets/readme%20img/BugFix%20-%20double%20rendered%20list.png)


The above was fixed by setting the groceryListEl html into an empty string before iteration.

    onValue(myGroceryListInDB, function(snapshot) {
        let itemsInDB = Object.values(snapshot.val())
        groceryListEl.innerHTML = ""
        for (let i = 0; i < itemsInDB.length; i++){
            appendItemIntoGroceryListEl(itemsInDB[i])
        }  
    })

![screenshot of double rendered list](/assets/readme%20img/BugFix%20-%20double%20rendered%20list%20fixed.png)


- If you were to delete the last item on the list, the following error would appear: 

![screenshot of error when trying to delete last item in grocery list](/assets/readme%20img/DeletingLastItemError.png)

This occurs because deleting the last item causes the groceryList reference to cease existing. Consequently, the OnValue function fails and doesn't retrieve any snapshot, as they also cease to exist.

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

Fixed this by using snapshot.exists() method, and use an if statement to return the item, or render a string to inform the user of the empty list instead.

    onValue(myGroceryListInDB, function(snapshot) {
    
    if (snapshot.exists()){
        let itemsInDB = Object.entries(snapshot.val())
        clearGroceryListEl()
        for (let i = 0; i < itemsInDB.length; i++){
            let currentItem = itemsInDB[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemIntoGroceryListEl(currentItem)
        } 
    } else {
        groceryListEl.innerHTML = "No items in your list..."
    }
     
})