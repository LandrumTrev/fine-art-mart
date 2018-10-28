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

    // ask the user to either confirm order, change order, or exit
    inquirer
        .prompt({
            name: "stockMgmnt",
            type: "rawlist",
            message: chalk.red("\nEnter the number of an inventory management function: \n"),
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
        })
        .then(function (choice) {

            console.log(choice.stockMgmnt);

            if (choice.stockMgmnt === "VIEW PRODUCTS FOR SALE") {
                // call function that displays all items in inventory
                displayForSale();
                console.log("You chose: VIEW PRODUCTS FOR SALE.")

            } else if (choice.stockMgmnt === "VIEW LOW INVENTORY") {
                // call function that displays only inventory items with low stock quantity
                viewLowStock();
                console.log("You chose: VIEW LOW INVENTORY.")

            } else if (choice.stockMgmnt === "ADD TO INVENTORY") {
                // call function that allows the increase of an item's stock_quantity
                addInventory();
                console.log("You chose: ADD TO INVENTORY.")

            } else if (choice.stockMgmnt === "ADD NEW PRODUCT") {
                // or call the fifth function, which exits the storefront
                // userExit();
                console.log("You chose: ADD NEW PRODUCT.")

            } else {
                console.log("Please enter a valid selection.")
            }

        });

}


// =======================================================================================
// 1. VIEW PRODUCTS FOR SALE - DISPLAYS ALL ITEMS IN INVENTORY
// =======================================================================================

function displayForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
        console.log(chalk.blue(' ALL ITEMS CURRENTLY IN THE FINE ART MART INVENTORY:'));
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.magenta('item# | price | title and artist | (quantity in stock)'));
        console.log(chalk.blue('--------------------------------------------------------------------\n'));

        // call a FOR LOOP on (res) to console.log all items in inventory
        for (let i = 0; i < res.length; i++) {

            var itemNo = res[i].item_id;
            if (itemNo < 10) {
                itemNo = "0" + itemNo;
            }

            console.log("   " + chalk.gray(itemNo) + "   " + res[i].retail_price + "   " + chalk.yellow(res[i].product_name) + " by " + chalk.greenBright(res[i].artist_name) + " " + chalk.gray("(" + res[i].stock_quantity + ")") + "\n");
        }

        console.log(chalk.blue('\n--------------------------------------------------------------------\n'));

        // =======================================================================================

        // call the initial Manager's Menu function
        managerMenu();
    });

    // // make sure to disconnect from the database at a functional end point
    // connection.end();
    // return;

};



// =======================================================================================
// 2. VIEW LOW INVENTORY - DISPLAY ALL ITEMS WITH A LOW NUMBER OF ITEMS IN STOCK
// =======================================================================================

function viewLowStock() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
        console.log(chalk.blue(' THE FOLLOWING ITEMS HAVE QUANTITIES OF LESS THAN 10 IN STOCK:'));
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.magenta('item# | price | title and artist | (quantity in stock)'));
        console.log(chalk.blue('--------------------------------------------------------------------\n'));

        // call a FOR LOOP on (res) to console.log all items in inventory
        for (let i = 0; i < res.length; i++) {

            var itemNo = res[i].item_id;
            if (itemNo < 10) {
                itemNo = "0" + itemNo;
            }

            if (res[i].stock_quantity < 10) {

                console.log("   " + chalk.gray(itemNo) + "   " + res[i].retail_price + "   " + chalk.yellow(res[i].product_name) + " by " + chalk.greenBright(res[i].artist_name) + " " + chalk.gray("(" + res[i].stock_quantity + ")") + "\n");

            }
        }

        console.log(chalk.blue('\n--------------------------------------------------------------------\n'));

        // =======================================================================================

        // call the initial Manager's Menu function
        managerMenu();
    });

    // // make sure to disconnect from the database at a functional end point
    // connection.end();
    // return;

};


// =======================================================================================
// 3. ADD TO INVENTORY - RECORD NEW INVENTORY RECIEVED INTO STOCK DATABASE
// =======================================================================================

function addInventory() {

    console.log(chalk.blue('\n--------------------------------------------------------------------'));
    console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: MANAGER \n'));
    console.log(chalk.blue(' ENTER THE ITEM NUMBER AND NUMBER OF PRODUCTS TO INCREASE ITS INVENTORY:'));
    console.log(chalk.blue('\n--------------------------------------------------------------------'));

    // first connection called so inquirer validate can make sure that
    // manager is choosing a valid stock item number to update
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

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

                // the new quantity to SET is the # of items added + current # of items in stock
                var newQuantity = parseInt(stock.stockQuantity) + parseInt(res[stock.stockItem - 1].stock_quantity);

                console.log(newQuantity);

                // second connection query is called to UPDATE the stock_quantity of the item_id
                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: stock.stockItem
                        }
                    ],
                    function (err, res2) {
                        if (err) throw err;

                        // tell the manager the item and number of items added
                        console.log("\nYou have added " + chalk.yellow(stock.stockQuantity) + " copies of " + chalk.yellow(res[stock.stockItem - 1].product_name) + " by " + chalk.greenBright(res[stock.stockItem - 1].artist_name));

                        // third connection query to confirm new stock quantity number
                        connection.query("SELECT * FROM products WHERE ?", {
                                item_id: stock.stockItem
                            },
                            function (err, res3) {
                                if (err) throw err;

                                // console.log(res3);

                                // tell the manager the item and new total number of items in stock
                                console.log("\nThere are now a total of " + chalk.yellow(res3[0].stock_quantity) + " copies of " + chalk.yellow(res3[0].product_name) + " by " + chalk.greenBright(res3[0].artist_name) + " in stock.");

                                // call the initial Manager's Menu function
                                managerMenu();

                            }); // end connection.query(SELECT *) new select all to confirm updated quantity

                    }); // end connection.query(UPDATE)

            }); // end inquirer

    }); // end connection.query(SELECT *)

}; // end addInventory()