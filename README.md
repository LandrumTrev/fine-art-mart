# Fine Art Mart

### A Node.js and MySQL CLI storefront, inventory manager, and department supervisor application

*MySQL, Node.js, npm, node_modules (inquirer, mysql, cliui, chalk), JavaScript. customer.js is a public-facing storefront, manager.js is an inventory control management back end, supervisor.js is a financial stats and new department creator application.*
_________________________________________________

[[Fine Art Mart demo movie](https://github.com/LandrumTrev/fine-art-mart/blob/master/FineArtMart-demo.mp4)](https://github.com/LandrumTrev/fine-art-mart/blob/master/FineArtMart-demo.mp4)

_________________________________________________

#### Fine Art Mart is a multi-sectional application, composed of a public-facing customer storefront (customer.js), a manager app for inventory control (manager.js), and a supervisor back-end for viewing financial information and creating new departments (supervisor.js). 

The application has a command-line interface and connects with a MySQL database (schema and seed file included). Written in JavaScript for Node.js, it uses the following npm packages:

* __mysql__ for database queries, 
* __inquirer__ for command-line input prompts, 
* __cliui__ to format tabluar data output in the CLI, and 
* __chalk__ to color highlight both inquirer and cliui command line output
 
_________________________________________________

### STOREFRONT
In the customer.js application, the user is greeted with a welcome message and a price list of all available art reproductions in stock (item number, price, title, artist, and quantity in stock). At the end of the price list, inquirer is utilized to prompt the customer for the item number of the print they wish to purchase. After entering the item number, they are asked how many copies of the print they wish to purchase. 

After selecting the quantity to purchase, a confirmation message appears with quantity, title, and artist name of thier purchase. Another line compliments their choice and displays the total purchase price, in addition to a breakdown of quantity @ price each.

At this point, the customer is presented with three choices:

* __PLACE ORDER__ completes the transaction.
* __EDIT SELECTION__ prompts the customer again for both item number and quantity.
* __EXIT__ logs the customer out of the storefront if they do not want to complete the transaction.

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

* __VIEW PRODUCTS FOR SALE__ generates an inventory price list view indentical to that of the customer storefront.
* __VIEW LOW INVENTORY__ shows an inventory price list of only items that have less than 10 copies in stock.
* __ADD TO INVENTORY__ allows the manager to increase the amount of inventory of an item when more quantity arrives.
* __ADD NEW PRODUCT__ allows the manager to create an entry for a new item that does not currently exist in the database.
* __EXIT INVENTORY MANAGER__ exits by terminating the script and disconnecting from the database.

Access the Inventory Manager with:
```
$ node manager
```
_________________________________________________

### DEPARTMENT SUPERVISOR
Separate and above the functions of the manager.js application is the Department Supervisor (supervisor.js). 

The Department Supervisor menu only has three options:

* __VIEW PRODUCT SALES BY DEPARTMENT__ displays a table listing all departments and their information: dept id #, department name, dept sales, dept overhead costs, and department profit (dynamically calculated as a virtual column in the returned data table objects array as the difference between sales and overhead).
* __CREATE NEW DEPARTMENT__ allows the supervisor to create a new department by querying the name and overhead cost of the new department.
* __EXIT DEPARTMENT SUPERVISOR__ disconnects from the database and ends the supervisor.js script.

Access the Department Supervisor with:
```
$ node supervisor
```
_________________________________________________

[source: https://github.com/LandrumTrev/fine-art-mart](https://github.com/LandrumTrev/fine-art-mart)

###### ©2018 Richard Trevillian
###### University of Richmond, Full Stack Web Development Bootcamp
###### 2018-10-27