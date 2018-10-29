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


    // connect to database and get the SUM of all product_sales, GROUP BY department
    connection.query("SELECT dept_id, department, SUM(product_sales) AS dept_sales, overhead_costs, SUM(product_sales) - overhead_costs AS total_profit FROM departments RIGHT JOIN products ON products.department = departments.dept_name GROUP BY department, dept_id", function (err, depts) {

        // console.log(depts);

        // table headings cliui code
        ui.div({
            text: chalk.green("\nDept ID\n"),
            width: 10,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nDepartment\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nDept Sales\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nOverhead\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        }, {
            text: chalk.green("\nTotal Profit\n"),
            width: 20,
            padding: [0, 0, 0, 0]
        });

        // loop through each dept in "departments" table
        for (let d = 0; d < depts.length; d++) {

            // variable for data object returned for each department
            var dep = depts[d];

            // each department's row cliui code
            ui.div({
                text: dep.dept_id,
                width: 10,
                padding: [0, 0, 0, 0]
            }, {
                text: dep.department,
                width: 20,
                padding: [0, 0, 0, 0]
            }, {
                text: dep.dept_sales,
                width: 20,
                padding: [0, 0, 0, 0]
            }, {
                text: dep.overhead_costs,
                width: 20,
                padding: [0, 0, 0, 0]
            }, {
                text: dep.total_profit,
                width: 20,
                padding: [0, 0, 0, 0]
            });


        }

        ui.div('');
        console.log(ui.toString());

        connection.end();
        return;

    });
};