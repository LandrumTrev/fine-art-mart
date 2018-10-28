# Fine Art Mart

### A Node.js and MySQL CLI storefront and inventory manager for fine art reproductions

*MySQL, Node.js, npm, node_modules (inquirer, mysql). customer.js is a public-facing storefront, manager.js is an inventory control management back end.*
_________________________________________________

[[Fine Art Mart demo movie](https://github.com/LandrumTrev/fine-art-mart/blob/master/FineArtMart-demo.mp4)](https://github.com/LandrumTrev/fine-art-mart/blob/master/FineArtMart-demo.mp4)

_________________________________________________

#### Fine Art Mart is a multi-sectional application, composed of a public-facing customer storefront application (customer.js), and an inventory manager application for internal use (manager.js). 

### STOREFRONT
In the customer.js application, the user is greeted with a welcome message and a price list of all available art reproductions in stock (item number, price, title, artist, and quantity in stock). At the end of the price list, inquirer is utilized to prompt the customer for the item number of the print they wish to purchase. After entering the item number, they are asked how many copies of the print they wish to purchase. 

After selecting the quantity to purchase, a confirmation message appears with quantity, title, and artist name of thier purchase. Another line compliments their choice and displays the total purchase price, in addition to a breakdown of quantity @ price each.

At this point, the customer is presented with three choices: 
* PLACE ORDER 
* EDIT SELECTION
* EXIT

PLACE ORDER completes the transaction.
EDIT SELECTION prompts the customer again for both item number and quantity.
EXIT logs the customer out of the storefront if they do not want to complete the transaction.

If the customer chooses PLACE ORDER, they are thanked for their order and notified that their account has been charged the amount of the purchase. In addition, they are notified of the new quantity in stock of the item they purchased, in case they would like to purchase more copies of the reproduction. (Such as interior decorators making bulk purchases of a single item for hotels, multiple homes, corporate installations, etc.)

Finally, the customer is queried as to whether they would like to make another purchase. If so, they are again asked for an item number and quantity. If they do not wish to make another purchase, they are presented with a thank you message, and the script terminates and disconnects from the database.

To access the Storefront, type:

```
$ node customer
```
_________________________________________________

### INVENTORY MANAGER
In addition to the storefront application, Fine Art Mart also features a separate Inventory Manager application (manager.js). 

Upon logging into the Inventory Manager, the manager is presented with a menu featuring five options:
* VIEW PRODUCTS FOR SALE
* VIEW LOW INVENTORY
* ADD TO INVENTORY
* ADD NEW PRODUCT
* EXIT INVENTORY MANAGER

VIEW PRODUCTS FOR SALE generates an inventory price list view indentical to that of the customer storefront.
VIEW LOW INVENTORY shows an inventory price list of only items that have less than 10 copies in stock.
ADD TO INVENTORY allows the manager to increase the amount of inventory of an item when more quantity arrives.
ADD NEW PRODUCT allows the manager to create an entry for a new item that does not currently exist in the database.
EXIT INVENTORY MANAGER exits by terminating the script and disconnecting from the database.

Access the Inventory Manager with:

```
$ node manager
```
_________________________________________________

[source: https://github.com/LandrumTrev/fine-art-mart](https://github.com/LandrumTrev/fine-art-mart)

###### ©2018 Richard Trevillian
###### University of Richmond, Full Stack Web Development Bootcamp
###### 2018-10-27