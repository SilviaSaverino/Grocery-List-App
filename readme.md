### Bug report and fixes :
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