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
        
        buyersQuery();

        connection.end();
    });
}

function buyersQuery() {

    inquirer
        .prompt([{
                name: "item",
                type: "input",
                message: chalk.magenta("Please enter the item number of the print you wish to purchase:"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
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


        });
}