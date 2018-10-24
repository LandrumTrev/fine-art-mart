// ====================================================
// Fine Art Mart Node.js and MySQL CLI store inventory app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================

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

function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.yellow('\n Welcome to FINE ART MART! \n'));
        console.log(chalk.blue(' Here is a list of fine art reproductions we currently have in stock:'));
        console.log(chalk.blue('\n--------------------------------------------------------------------'));
        console.log(chalk.magenta(' item | price | title and artist'));
        console.log(chalk.blue('--------------------------------------------------------------------\n'));

        for (let i = 0; i < res.length; i++) {

            var itemNo = res[i].item_id;
            if (itemNo < 10) {
                itemNo = "0" + itemNo;
            }

            console.log("   " + chalk.gray(itemNo) + "   " + res[i].retail_price + "   " + chalk.yellow(res[i].product_name) + " by " + chalk.greenBright(res[i].artist_name) + "\n");
        }

        console.log(chalk.blue('\n--------------------------------------------------------------------\n'));

        buyersQuery(res);

        connection.end();
    });
}

function buyersQuery(res) {

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

            var orderTotal = res[answer.item].retail_price * answer.quantity;

            console.log("\nYou selected " + chalk.yellow(answer.quantity) + " copies of " + chalk.yellow(res[answer.item].product_name) + " by " + chalk.greenBright(res[answer.item].artist_name));

            if (answer.quantity > res[answer.item].stock_quantity) {

                console.log("\nWe're sorry, but we only have " + chalk.yellow(res[answer.item].stock_quantity) + " copies of " + chalk.yellow(res[answer.item].product_name) + " by " + chalk.greenBright(res[answer.item].artist_name) + " in stock right now. \nPlease enter your desired item number again and choose a quantity less than " + chalk.yellow(res[answer.item].stock_quantity) + ".\n");

                buyersQuery(res);

            } else {

                console.log(chalk.blue("\nExcellent choice.") + " Your total is " + chalk.yellow("$" + orderTotal) + " (" + answer.quantity + " @ $" + res[answer.item].retail_price + " each)\n");

                inquirer
                    .prompt({
                        name: "finalchoice",
                        type: "list",
                        message: chalk.red("\nUse your up/down arrow keys to select one of the following: \n") + chalk.green("1. [PLACE ORDER]") + " to complete your transaction, \n" + chalk.green("2. [EDIT SELECTION]") + " to change your selection and/or quantity, or \n" + chalk.green("3. [EXIT]") + " if you are not ready to order right now.\n",
                        choices: ["PLACE ORDER", "EDIT SELECTION", "EXIT"],

                    })
                    .then(function (answer, orderTotal) {

                        // REWRITE SWITCH CASE AS IF ELSE
                        
                        // switch (answer.action) {
                        //     case "PLACE ORDER":
                        //         console.log(orderTotal);
                        //         console.log("Monkey Butts!");
                        //         placeOrder(res, answer, orderTotal);
                        //         break;

                        //     case "EDIT SELECTION":
                        //         buyersQuery();
                        //         break;

                        //     case "EXIT":
                        //         userExit();
                        //         break;

                        //     // default:
                        //     //     placeOrder();
                        // }


                    });

            }


            function placeOrder(res, answer, orderTotal) {

                // call the database and subtract the order quantity from the items stock_quanity

                console.log("\nThank you for your order. In case you need more copies of THE_ITEM, we now currently have NEW_QUANTITY THE_ITEM prints in stock.\n");

                // console.log("Thank you for your order. Your account has been charged " + chalk.yellow("$" + orderTotal));

            };

            function userExit() {

                console.log("Thank you for visiting Fine Art Mart. Please come again soon.");

            };

        });

}