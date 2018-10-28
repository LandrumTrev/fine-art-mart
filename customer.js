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

function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.yellow('\n Welcome to FINE ART MART! \n'));
        console.log(chalk.blue(' Here is a list of fine art reproductions we currently have in stock:'));
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
                message: chalk.magenta("Please enter the item number of the print you wish to purchase:"),
                validate: function (value) {
                    if (isNaN(value) === false && value < (res.length + 1) && value > 0) {
                        return true;
                    }
                    console.log(" Sorry, that isn't an item number in our inventory.")
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: chalk.cyan("Please enter how many copies of this print you wish to purchase:"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {

            // tell the customer the item and quantity they chose
            console.log("\nYou selected " + chalk.yellow(answer.quantity) + " copies of " + chalk.yellow(res[answer.item - 1].product_name) + " by " + chalk.greenBright(res[answer.item - 1].artist_name));

            // check to see if the quantity requested exceeds the number of items in inventory
            if (answer.quantity > res[answer.item - 1].stock_quantity) {

                // if the customer wants more items than exist in inventory, then
                console.log("\nWe're sorry, but we only have " + chalk.yellow(res[answer.item - 1].stock_quantity) + " copies of " + chalk.yellow(res[answer.item - 1].product_name) + " by " + chalk.greenBright(res[answer.item - 1].artist_name) + " in stock right now. \nPlease enter your desired item number again and choose a quantity less than " + chalk.yellow(res[answer.item - 1].stock_quantity) + ".\n");

                // send them back to the item and quantity input prompt (self-ref this function)
                // pass in the Array of inventory objects, so customer can still select from it
                buyersQuery(res);

            } else {

                // otherwise, if the quantity of the order can be fulfilled based on inventory available
                console.log(chalk.blue("\nExcellent choice.") + " Your total is " + chalk.yellow("$" + Math.round(((res[answer.item - 1].retail_price * answer.quantity) + 0.00001) * 100) / 100) + " (" + answer.quantity + " @ $" + res[answer.item - 1].retail_price + " each)\n");

                // send them on to the (3rd function) final order confirmation choice,
                // which offers the choices: PLACE ORDER, EDIT SELECTION, or EXIT
                // pass in both the inventory object array, and answers (item and quant) from this inquirer
                finalChoice(res, answer);

            }

        });

}


// =======================================================================================
// THIRD FUNCTION, CALLED BY buyersQuery(). ASKS FOR PLACE ORDER, EDIT SELECTION, or EXIT
// =======================================================================================

// pass in (res) the inventory object array, 
// and (answer) the customer's item and quantity data
function finalChoice(res, answer) {

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
                // pass in the inventory objects array, as well as item and quantity data
                placeOrder(res, answer);
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

function placeOrder(res, answer) {

    // make a call to the database, and reduce the stock_quantity of the item ordered by the ordered quantity
    connection.query("UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: res[answer.item - 1].stock_quantity - answer.quantity
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

            // tell the customer how much they have been charged for their order
            console.log(chalk.green("\nThank you for your order. Your account has been charged ") + chalk.yellow("$" + Math.round(((finalRes[answer.item - 1].retail_price * answer.quantity) + 0.00001) * 100) / 100));

            // tell the customer how many prints of the item they ordered now remain in stock
            console.log("\nIf need more copies of this item, we now have " + chalk.yellow(finalRes[answer.item - 1].stock_quantity) + " prints of " + chalk.yellow(finalRes[answer.item - 1].product_name) + " by " + chalk.greenBright(finalRes[answer.item - 1].artist_name) + " left in stock.\n");

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

function userExit() {

    console.log(chalk.red("\nThank you for visiting Fine Art Mart. Please come again soon.\n"));

    // make sure to disconnect from the database at a functional end point
    connection.end();
    return;
};