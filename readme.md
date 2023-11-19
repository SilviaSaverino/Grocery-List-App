### Bug report and fixes :
Whenever an item was deleted from the database, the list refreshed. However it would render both the old and new items together without removing the old one.

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