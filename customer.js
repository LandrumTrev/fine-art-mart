// ====================================================
// Fine Art Mart Node.js and MySQL CLI store inventory app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// CUSTOMER.JS - THE PUBLIC-FACING STOREFRONT
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
    displayInventory();
});


// =======================================================================================
// FIRST FUNCTION, CALLED BY .connect(). DISPLAYS THE INVENTORY LIST
// =======================================================================================

// call function to display a full list of all items available for purchase
function displayInventory() {

    // cliui HAS TO BE REQUIRED INSIDE A FUNCTION INDIVIDUALLY
    // OTHERWISE IT WILL REMEBER EVERYTHING THAT HAS BEEN PRINTED BEFORE
    // AND PRINT OUT ALL PREVIOUS ENTRIES WITH THE CURRENT RETURN
    var ui = require('cliui')();

    // connect to database and get all items from the products table
    connection.query("SELECT * FROM products ORDER BY department, retail_price", function (err, res) {

        if (err) throw err;

        // list header display messages
        ui.div(chalk.blue('-------------------------------------------------------------------------------\n'));
        ui.div(chalk.yellow('\n Welcome to FINE ART MART! \n'));
        ui.div(chalk.blue(' Here is a list of fine art reproductions we currently have in stock:'));
        ui.div(chalk.blue('\n-------------------------------------------------------------------------------'));

        // create structured table headings using cliui
        ui.div({
            text: chalk.magenta("#"),
            width: 4
        }, {
            text: chalk.magenta("price"),
            width: 8
        }, {
            text: chalk.magenta("title"),
            width: 30
        }, {
            text: chalk.magenta("artist"),
            width: 20
        }, {
            text: chalk.magenta("department"),
            width: 12
        }, {
            text: chalk.magenta("stock"),
            width: 9
        });

        ui.div(chalk.blue('-------------------------------------------------------------------------------\n'));

        // call a FOR LOOP on (res) to console.log all items in inventory
        for (let i = 0; i < res.length; i++) {

            var itemNo = res[i].item_id;
            if (itemNo < 10) {
                itemNo = "0" + itemNo;
            }

            // output a structured table row for each dept using cliui
            ui.div({
                text: chalk.magenta(itemNo),
                width: 4
            }, {
                text: res[i].retail_price,
                width: 8
            }, {
                text: chalk.yellow(res[i].product_name),
                width: 30
            }, {
                text: chalk.green(res[i].artist_name),
                width: 20
            }, {
                text: chalk.gray(res[i].department),
                width: 12
            }, {
                text: chalk.gray(res[i].stock_quantity),
                width: 9
            });

            // create a blank line spacer between each row
            ui.div('');

        }

        ui.div(chalk.blue('-------------------------------------------------------------------------------\n'));

        // tell cliui to output all ui.div
        console.log(ui.toString());

        // after display inventory, call function that asks item and quantity to purchase
        // and pass in (res), which is an array of all inventory objects
        buyersQuery(res);
    });
};


// =======================================================================================
// SECOND FUNCTION, CALLED BY displayInventory(). ASKS FOR ITEM AND QUANTITY
// =======================================================================================

// pass in (res) from displayInventory(), which is the Array of all inventory objects
function buyersQuery(res) {

    // ask for item and quantity customer wishes to purchase
    inquirer
        .prompt([{
                name: "item",
                type: "input",
                message: chalk.magenta("Please enter the item number of the piece you wish to purchase:"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log(" Sorry, that isn't an item number in our inventory.")
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: chalk.cyan("Please enter how many copies of this piece you wish to purchase:"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // this (answer) will be passed through the rest of the app
            // to keep track of the current item# and quantity selected for purchase

            // match the item number entered by customer to an item with that item_id
            var theItem = function () {
                for (let p = 0; p < res.length; p++) {
                    var itemMatch;
                    var idNumber = res[p].item_id;
                    var answerItem = parseInt(answer.item);
                    if (idNumber === answerItem) {
                        itemMatch = res[p];
                    }
                }
                return itemMatch;
            };

            // item now represents the whole object of the item the customer has selected
            var item = theItem();
            // console.log(item);

            if (item === undefined) {

                console.log("\n" + chalk.red("SORRY, THAT ITEM NUMBER DOES NOT EXIST."));

                // call the Inventory Management Menu function
                buyersQuery(res);
                // return;

            } else {


                // tell the customer the item and quantity they chose
                console.log("\nYou selected " + chalk.magenta(answer.quantity) + " " + chalk.yellow(item.product_name) + " " + item.department + " by " + chalk.greenBright(item.artist_name));

                // check to see if the quantity requested exceeds the number of items in inventory
                if (answer.quantity > item.stock_quantity) {

                    // if the customer wants more items than exist in inventory, then
                    console.log("\nWe're sorry, but we only have " + chalk.magenta(item.stock_quantity) + " " + chalk.yellow(item.product_name) + " " + item.department + " by " + chalk.greenBright(item.artist_name) + " in stock right now. \nPlease enter your desired item number again and choose a quantity less than " + chalk.yellow(item.stock_quantity) + ".\n");

                    // send them back to the item and quantity input prompt (self-ref this function)
                    // pass in the Array of inventory objects, so customer can still select from it
                    buyersQuery(res);

                } else {

                    // otherwise, if the quantity of the order can be fulfilled based on inventory available
                    console.log(chalk.blue("\nExcellent choice.") + " Your total is " + chalk.yellow("$" + Math.round(((item.retail_price * answer.quantity) + 0.00001) * 100) / 100) + " (" + answer.quantity + " @ $" + item.retail_price + " each)\n");

                    // send them on to the (3rd function) final order confirmation choice,
                    // which offers the choices: PLACE ORDER, EDIT SELECTION, or EXIT
                    // pass in both the inventory object array, and answers (item and quant) from this inquirer
                    finalChoice(res, answer, item);

                } // end IF ELSE for sufficient quantity check

            } // end IF ELSE to check if item number exists in inventory

        }); // end inquirer

}; // end buyersQuery()



// =======================================================================================
// THIRD FUNCTION, CALLED BY buyersQuery(). ASKS FOR PLACE ORDER, EDIT SELECTION, or EXIT
// =======================================================================================

// pass in (res) the inventory object array, 
// and (answer) the customer's item and quantity data
// and (item) the whole object for the current item selected
function finalChoice(res, answer, item) {

    // ask the user to either confirm order, change order, or exit
    inquirer
        .prompt({
            name: "finalchoice",
            type: "rawlist",
            message: chalk.red("\nEnter the number of one of the following choices: \n") + chalk.green("1. [PLACE ORDER]") + " to complete your transaction, \n" + chalk.green("2. [EDIT SELECTION]") + " to change your selection and/or quantity, or \n" + chalk.green("3. [EXIT]") + " if you are not ready to order right now.\n",
            choices: ["PLACE ORDER", "EDIT SELECTION", "EXIT"]
        })
        .then(function (choice) {

            console.log(choice.finalchoice);

            if (choice.finalchoice === "PLACE ORDER") {
                // call the fourth function, which completes the order
                // pass in the objects of the item selected, as well as item and quantity data
                placeOrder(answer, item);
            } else if (choice.finalchoice === "EDIT SELECTION") {
                // or call the item and quantity input function again
                // pass the inventory objects array back into the input function
                buyersQuery(res);
            } else if (choice.finalchoice === "EXIT") {
                // or call the fifth function, which exits the storefront
                userExit();
            } else {
                console.log("Please enter a valid selection.")
            }

        });
}



// =======================================================================================
// FOURTH FUNCTION, called by finalChoice() IF USER CHOOSES "PLACE ORDER", 
// UPDATES THE QUANTITY OF THE ITEM IN THE DATABASE, THEN CALLS orderConfirm()
// =======================================================================================

// call as final step in placing order
// continuing to pass along the (res) inventory list and (answer) item and quantity data
function placeOrder(answer, item) {

    // make a call to the database, and reduce the stock_quantity of the item ordered by the ordered quantity
    connection.query("UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: item.stock_quantity - answer.quantity,
                product_sales: item.product_sales + (Math.round(((item.retail_price * answer.quantity) + 0.00001) * 100) / 100)
            },
            {
                item_id: answer.item
            }
        ],
        function (err, updateRes) {
            if (err) throw err;

            // after item's quantity is updated, call orderConfirm()
            // pass in: (answer) the item number and quantity chosen by user
            orderConfirm(answer);

        });
};



// =======================================================================================
// FIFTH FUNCTION, called by placeOrder(), READS UPDATED QUANT FROM DB
// =======================================================================================

// here just pass in the customer's item number and quantity selected,
// as we will now call the database and get a new set of all data with quantities updated
function orderConfirm(answer) {

    // call the database, and get a new set of all items with quantities updated, called (finalRes)
    connection.query("SELECT * FROM products", function (err, finalRes) {

        if (err) throw err;

        // again, match the item number entered by customer to the now updated item with that item_id
        var itemSale = function () {
            for (let p = 0; p < finalRes.length; p++) {
                var itemMatch;
                var idNumber = finalRes[p].item_id;
                var answerItem = parseInt(answer.item);
                if (idNumber === answerItem) {
                    itemMatch = finalRes[p];
                }
            }
            return itemMatch;
        };

        // itemSold replaces item as the entire object of the customer's selected item,
        // now with an updated quantity (previous quant minus customer's purchased quant)
        var itemSold = itemSale();
        // console.log(itemSold);

        // tell the customer how much they have been charged for their order
        console.log(chalk.green("\nThank you for your order. Your account has been charged ") + chalk.yellow("$" + Math.round(((itemSold.retail_price * answer.quantity) + 0.00001) * 100) / 100));

        // tell the customer how many prints of the item they ordered now remain in stock
        console.log("\nIf need more copies of this item, we now have " + chalk.magenta(itemSold.stock_quantity) + " " + chalk.yellow(itemSold.product_name) + " " + itemSold.department + " by " + chalk.greenBright(itemSold.artist_name) + " left in stock.\n");

        // ADMIN - check for correct updates to the product_sales fields
        console.log("Total Sales for " + chalk.yellow(itemSold.product_name) + " " + itemSold.department + " by " + chalk.greenBright(itemSold.artist_name) + " are " + chalk.yellow("$" + itemSold.product_sales));

        // ask the customer if they want to place another order
        inquirer
            .prompt({
                name: "buymore",
                type: "confirm",
                message: "Would you like to place another order?"
            })
            .then(function (yesno) {

                if (yesno.buymore === true) {
                    // call the item and quantity input again, and pass it the updated inventory array
                    buyersQuery(finalRes);
                } else {
                    // call the userExit() function and say goodbye
                    userExit();
                }
            });

    });

};



// =======================================================================================
// SIXTH FUNCTION, WHEN USER DECIDES TO EXIT STORE
// =======================================================================================

// call when the customer is finished shopping and ready to leave the store
function userExit() {

    console.log(chalk.red("\nThank you for visiting Fine Art Mart. Please come again soon.\n"));

    // make sure to disconnect from the database at a functional end point
    connection.end();
    return;
};