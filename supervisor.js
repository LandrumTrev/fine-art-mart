// ====================================================
// Fine Art Mart Node.js and MySQL CLI store inventory app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// SUPERVISOR.JS - DEPARTMENT MANAGEMENT APPLICATION
// ====================================================


// =======================================================================================
// GLOBAL VARIABLES AND DATABASE CONNECT FUNCTION
// =======================================================================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk');
var ui = require('cliui')();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "fineartmart_db"
});


connection.connect(function (err) {

    if (err) throw err;

    // console.log("Supervisor.js connected");
    // console.log("Supervisor.js disconnecting, bye bye.");
    // connection.end();
    // return;

    // call the initial Manager's Menu function
    supervisorMenu();
});


// =======================================================================================
// MENU CHOICES FUNCTION, CALLED BY .connect() - DISPLAYS DEPARTMENT SUPERVISOR OPTIONS
// =======================================================================================

function supervisorMenu() {

    // ask the supervisor which department management function to access
    inquirer
        .prompt({
            name: "superQuest",
            type: "rawlist",
            message: chalk.red("\nEnter the number of a department supervisory function: \n"),
            choices: ["VIEW PRODUCT SALES BY DEPARTMENT", "CREATE NEW DEPARTMENT", "EXIT DEPARTMENT SUPERVISOR"]
        })
        .then(function (menu) {

            console.log(menu.superQuest);

            if (menu.superQuest === "VIEW PRODUCT SALES BY DEPARTMENT") {
                // call function that displays a table of costs, sales, and profit of each department
                // console.log("You chose VIEW PRODUCT SALES BY DEPARTMENT")
                // connection.end();
                viewSalesByDept();

            } else if (menu.superQuest === "CREATE NEW DEPARTMENT") {
                // call function that allows the creation of a new dept and queries initial info about it
                console.log("You chose CREATE NEW DEPARTMENT")
                connection.end();
                // createNewDept();

            } else if (menu.superQuest === "EXIT DEPARTMENT SUPERVISOR") {
                // call function that disconnects from db and exits Supervisor app
                console.log("You chose EXIT DEPARTMENT SUPERVISOR. BYE!")
                connection.end();
                // superExit();

            } else {
                console.log("Please enter a valid selection.")
            }
        });
};



// =======================================================================================
// FIRST MENU OPTION, called by supervisorMenu() - table of costs, sales, profits by dept
// =======================================================================================

function viewSalesByDept() {

    // connect to database and get all items from the products table
    connection.query("SELECT * FROM departments", function (err, res) {

        if (err) throw err;

        ui.div({
            text: chalk.green("\nDept ID\n"),
            width: 10,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nDept Name\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nOverhead Costs\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nProduct Sales\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nTotal Profit\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        });


        for (let d = 0; d < res.length; d++) {

            var element = res[d];

            ui.div({
                text: element.dept_id,
                width: 10,
                padding: [0, 0, 0, 0]
            }, {
                text: element.dept_name,
                width: 20,
                padding: [0, 0, 0, 0]
            }, {
                text: element.overhead_costs,
                width: 20,
                padding: [0, 0, 0, 0]
            }, {
                text: element.overhead_costs,
                width: 20,
                padding: [0, 0, 0, 0]
            }, {
                text: element.overhead_costs,
                width: 20,
                padding: [0, 0, 0, 0]
            });


        }

        ui.div('');
        console.log(ui.toString());



    });

    connection.end();
    return;

};


// function viewSalesByDept() {

// // this is it's own line, nothing special, just prints ('this stuff')
// ui.div('Usage: $0 [command] [options]')

// // this prints 'Options:', and applies padding as # of lines or chars
// // so 2 lines top, 0 chars right, 2 lines bottom, 0 chars left
// ui.div({
//     text: 'Options:',
//     padding: [2, 0, 2, 0]
// })

// ui.div({
//     // this prints "-f, --file" 
//     // in a 20 char width column, 
//     // with 4 char padding left/right
//     text: "-f, --file",
//     width: 20,
//     padding: [0, 4, 0, 4]
// }, {
//     // this prints "the file to load." + chalk.green("more text...")
//     // in a 20 char width column
//     text: "the file to load." +
//         chalk.green("(if this description is long it wraps)."),
//     width: 20
// }, {
//     // this prints "[required]"
//     // and aligns it against the right terminal window edge
//     text: chalk.red("[required]"),
//     align: 'right'
// })

// // this takes all of the above and prints it out to the terminal console
// console.log(ui.toString())

//     connection.end();
//     return;

// };