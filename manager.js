// ====================================================
// Fine Art Mart Node.js and MySQL CLI store inventory app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// MANAGER.JS - THE INVENTORY CONTROL BACK-END
// ====================================================


// =======================================================================================
// GLOBAL VARIABLES AND DATABASE CONNECT FUNCTION
// =======================================================================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "fineartmart_db"
});


connection.connect(function (err) {
    if (err) throw err;

    // call the initial Manager's Menu function
    managerMenu();
});


// =======================================================================================
// INITIAL MENU FUNCTION, CALLED BY .connect() - DISPLAYS INVENTORY MANAGMENT OPTIONS
// =======================================================================================

function managerMenu() {

    // header display messages
    console.log(chalk.blue('\n--------------------------------------------------------------------'));
    console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER'));
    console.log(chalk.blue('\n--------------------------------------------------------------------'));

    // ask the manager which inventory control function to access
    inquirer
        .prompt({
            name: "stockMgmnt",
            type: "rawlist",
            message: chalk.red("\nEnter the number of an inventory management function: \n"),
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT INVENTORY MANAGER"]
        })
        .then(function (choice) {

            // console.log(choice.stockMgmnt);

            if (choice.stockMgmnt === "VIEW PRODUCTS FOR SALE") {
                // call function that displays all items in inventory
                displayForSale();

            } else if (choice.stockMgmnt === "VIEW LOW INVENTORY") {
                // call function that displays only inventory items with low stock quantity
                viewLowStock();

            } else if (choice.stockMgmnt === "ADD TO INVENTORY") {
                // call function that allows the increase of an item's stock_quantity
                addInventory();

            } else if (choice.stockMgmnt === "ADD NEW PRODUCT") {
                // call function that adds a brand new item into the inventory
                addItem();

            } else if (choice.stockMgmnt === "EXIT INVENTORY MANAGER") {
                // call function that adds a brand new item into the inventory
                managerExit();

            } else {
                console.log("Please enter a valid selection.")
            }
        });
}



// =======================================================================================
// 1. VIEW PRODUCTS FOR SALE - DISPLAYS ALL ITEMS IN INVENTORY
// =======================================================================================

// display a full list of all items in inventory and all info about each item
function displayForSale() {

    // connect to database and get all items from the products table
    connection.query("SELECT * FROM products ORDER BY department, retail_price", function (err, res) {

        if (err) throw err;

        // list header display messages
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
        console.log(chalk.blue(' THE FOLLOWING ARE ALL ITEMS CURRENTLY IN INVENTORY:'));
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.magenta('item# | price | title and artist | (quantity in stock) | department'));
        console.log(chalk.blue('--------------------------------------------------------------------\n'));

        // call a FOR LOOP on (res) to console.log all items in inventory
        for (let i = 0; i < res.length; i++) {

            var itemNo = res[i].item_id;
            if (itemNo < 10) {
                itemNo = "0" + itemNo;
            }

            console.log("   " + chalk.magenta(itemNo) + "   " + res[i].retail_price + "   " + chalk.yellow(res[i].product_name) + " by " + chalk.greenBright(res[i].artist_name) + " " + chalk.gray("(x" + res[i].stock_quantity + ")") + " " + chalk.gray(res[i].department) + "\n");
        }

        console.log(chalk.blue('\n--------------------------------------------------------------------\n'));

        // call the Inventory Management Menu function
        managerMenu();
    });
};



// =======================================================================================
// 2. VIEW LOW INVENTORY - DISPLAY ALL ITEMS WITH A LOW NUMBER OF ITEMS IN STOCK
// =======================================================================================

// call to display low inventory items
function viewLowStock() {

    // fetch all items from the products table in db
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        // list header display messages
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
        console.log(chalk.blue(' THE FOLLOWING ITEMS HAVE QUANTITIES OF LESS THAN 10 IN STOCK:'));
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.magenta('item# | price | title and artist | (quantity in stock) | department'));
        console.log(chalk.blue('--------------------------------------------------------------------\n'));

        // call a FOR LOOP on (res) to console.log all items in inventory
        for (let i = 0; i < res.length; i++) {

            var itemNo = res[i].item_id;
            if (itemNo < 10) {
                itemNo = "0" + itemNo;
            }

            // only display detail for items with an inventory stock quantity less than 10
            if (res[i].stock_quantity < 10) {

                console.log("   " + chalk.magenta(itemNo) + "   " + res[i].retail_price + "   " + chalk.yellow(res[i].product_name) + " by " + chalk.greenBright(res[i].artist_name) + " " + chalk.gray("(x" + res[i].stock_quantity + ")") + " " + chalk.gray(res[i].department) + "\n");

            }
        }

        console.log(chalk.blue('\n--------------------------------------------------------------------\n'));

        // call the Inventory Management Menu function
        managerMenu();
    });

};


// =======================================================================================
// 3. ADD TO INVENTORY - RECORD NEW INVENTORY RECIEVED INTO STOCK DATABASE
// =======================================================================================

// call to add more inventory quantity to an existing item
function addInventory() {

    // header display messages
    console.log(chalk.blue('\n--------------------------------------------------------------------'));
    console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
    console.log(chalk.blue(' ENTER THE ITEM NUMBER AND NUMBER OF PRODUCTS TO INCREASE ITS INVENTORY:'));
    console.log(chalk.blue('\n--------------------------------------------------------------------'));

    // first connection called so inquirer's validate function can make sure that
    // manager is choosing an existing stock item number to update
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        // ask for the product's item number and quantity to add
        inquirer
            .prompt([{
                    name: "stockItem",
                    type: "input",
                    message: chalk.magenta("Enter the product's item#:"),
                    validate: function (value) {
                        if (isNaN(value) === false && value < (res.length + 1) && value > 0) {
                            return true;
                        }
                        console.log(" Sorry, that isn't an item number in our inventory.")
                        return false;
                    }
                },
                {
                    name: "stockQuantity",
                    type: "input",
                    message: chalk.cyan("Enter the number of items added to stock:"),
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (stock) {

                // match the item number indicated by manager to the item with that item_id
                var updatedItem = function () {
                    for (let p = 0; p < res.length; p++) {
                        var itemMatch;
                        var idNumber = res[p].item_id;
                        var answerItem = parseInt(stock.stockItem);
                        if (idNumber === answerItem) {
                            itemMatch = res[p];
                        }
                    }
                    return itemMatch;
                };
                // itemNewQuant represents the whole object of the item to update quantity on
                var itemNewQuant = updatedItem();
                console.log(itemNewQuant);

                // the new quantity to SET is the # of items added + current # of items in stock
                // needs parseInt() as these raw values are Strings (numbers concatenate instead of add w/o parseInt)
                var newQuantity = parseInt(stock.stockQuantity) + parseInt(itemNewQuant.stock_quantity);

                console.log(newQuantity);

                // second connection query is called to UPDATE the stock_quantity of the item_id
                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: itemNewQuant.item_id
                        }
                    ],
                    function (err, res2) {

                        if (err) throw err;

                        // tell the manager the item and number of items added
                        console.log("\nYou have added " + chalk.yellow(stock.stockQuantity) + " copies of " + chalk.yellow(itemNewQuant.product_name) + " " + itemNewQuant.department + " by " + chalk.greenBright(itemNewQuant.artist_name));

                        // third connection query to confirm new stock quantity number
                        connection.query("SELECT * FROM products WHERE ?", {
                                item_id: itemNewQuant.item_id
                            },
                            function (err, res3) {

                                if (err) throw err;

                                // confirm the updated item's quantity with data from a fresh mySQL SELECT
                                console.log("\nThere are now a total of " + chalk.yellow(res3[0].stock_quantity) + " copies of " + chalk.yellow(res3[0].product_name) + " " + res3[0].department + " by " + chalk.greenBright(res3[0].artist_name) + " in stock.");

                                // call the initial Manager's Menu function
                                managerMenu();

                            }); // end connection.query(SELECT *) new select all to confirm updated quantity

                    }); // end connection.query(UPDATE)

            }); // end inquirer

    }); // end connection.query(SELECT *)

}; // end addInventory()



// =======================================================================================
// 4. ADD NEW PRODUCT - ALLOWS THE ADDITION OF A NEW ITEM TO THE STORE
// =======================================================================================

// call to add a brand new item and it's details into the database
function addItem() {

    // header display messages
    console.log(chalk.blue('\n--------------------------------------------------------------------'));
    console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
    console.log(chalk.blue(' ENTER THE FOLLOWING INFORMATION TO ADD A NEW PRODUCT TO THE INVENTORY LIST:'));
    console.log(chalk.blue('\n--------------------------------------------------------------------'));

    // ask for all the details to enter about an item
    // department and name (of artwork) are required
    inquirer
        .prompt([{
                name: "dept",
                type: "input",
                message: chalk.magenta("Enter the item's department (i.e. prints):"),
            },
            {
                name: "name",
                type: "input",
                message: chalk.magenta("Enter the title of the artwork:"),
            },
            {
                name: "artist",
                type: "input",
                message: chalk.magenta("Enter the artist's name:"),
            },
            {
                name: "price",
                type: "input",
                message: chalk.magenta("Enter the retail price of the item (i.e., 19.99):"),
                validate: function (input) {
                    input = input.replace(/\s+/g, "");
                    if (isFinite(input) && input != '') {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: chalk.magenta("Enter the quantity of the item now in stock:"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (newItem) {

            // connection query to insert the VALUES of the new item
            connection.query("INSERT INTO products SET ?", {
                    department: newItem.dept,
                    product_name: newItem.name,
                    artist_name: newItem.artist,
                    retail_price: newItem.price,
                    stock_quantity: newItem.quantity
                },
                function (err, resA) {

                    if (err) throw err;

                    // follow-up connection query to confirm addition of new item, 
                    // and also to return its auto_incremented item_id number
                    connection.query("SELECT * FROM products WHERE ?", {
                            product_name: newItem.name
                        },
                        function (err, resB) {
                            if (err) throw err;

                            console.log(chalk.blue('\n SUCCESS! You have added the following new product to inventory:'));
                            console.log(chalk.blue('\n--------------------------------------------------------------------'));
                            console.log(chalk.magenta('item# | price | title and artist | (quantity in stock) | department'));
                            console.log(chalk.blue('--------------------------------------------------------------------\n'));

                            console.log("   " + chalk.gray(resB[0].item_id) + "   " + resB[0].retail_price + "   " + chalk.yellow(resB[0].product_name) + " by " + chalk.greenBright(resB[0].artist_name) + " " + chalk.gray("(" + resB[0].stock_quantity + ")") + " " + chalk.gray(resB[0].department) + "\n");

                            // call the initial Manager's Menu function
                            managerMenu();

                        }); // end connection.query(SELECT *) new select all to confirm added item details

                }); // end connection.query(INSERT) new item

        }); // end inquirer

}; // end addItem()



// =======================================================================================
// 5. MANAGER EXIT - EXIT THE MANAGEMENT FUNCTION
// =======================================================================================

// call this function to exit from the Inventory Manager application
function managerExit() {

    console.log(chalk.red("\nYou have now logged out of the Fine Art Mart INVENTORY MANAGER.\n"));

    // make sure to disconnect from the database at a functional end point
    connection.end();
    return;
};