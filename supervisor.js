// ====================================================
// Fine Art Mart Node.js and MySQL CLI store inventory app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// SUPERVISOR.JS - DEPARTMENT MANAGEMENT BACK-END
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
    supervisorMenu();
});


// =======================================================================================
// MENU CHOICES FUNCTION, CALLED BY .connect() - DISPLAYS DEPARTMENT SUPERVISOR OPTIONS
// =======================================================================================

function supervisorMenu() {

    // list header display messages
    console.log(chalk.blue('\n-------------------------------------------------------------------------------'));
    console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: SUPERVISOR \n'));
    console.log(chalk.red(' SUPERVISOR FUNCTION MENU:'));


    // ask the supervisor which department management function to access
    inquirer
        .prompt({
            name: "superQuest",
            type: "rawlist",
            message: chalk.red("\n Enter the number of a department supervisory function: \n"),
            choices: ["VIEW PRODUCT SALES BY DEPARTMENT", "CREATE NEW DEPARTMENT", "EXIT DEPARTMENT SUPERVISOR"]
        })
        .then(function (menu) {

            // console.log(menu.superQuest);

            if (menu.superQuest === "VIEW PRODUCT SALES BY DEPARTMENT") {
                // call function that displays a table of costs, sales, and profit of each department
                viewSalesByDept();

            } else if (menu.superQuest === "CREATE NEW DEPARTMENT") {
                // call function that allows the creation of a new dept and queries initial info about it
                createNewDept();

            } else if (menu.superQuest === "EXIT DEPARTMENT SUPERVISOR") {
                // disconnects from db and exits Supervisor app
                console.log("You chose EXIT DEPARTMENT SUPERVISOR. BYE!")
                connection.end();

            } else {
                console.log("Please enter a valid selection.")
                return;
            }
        });
};



// =======================================================================================
// FIRST MENU OPTION, called by supervisorMenu() - table of costs, sales, profits by dept
// =======================================================================================

function viewSalesByDept() {

    // cliui HAS TO BE REQUIRED INSIDE A FUNCTION INDIVIDUALLY
    // OTHERWISE IT WILL REMEBER EVERYTHING THAT HAS BEEN PRINTED BEFORE
    // AND PRINT OUT ALL PREVIOUS ENTRIES WITH THE CURRENT RETURN
    var ui = require('cliui')();

    // connect to database and get the SUM of all product_sales, GROUP BY department
    connection.query("SELECT dept_id, department, SUM(product_sales) AS dept_sales, overhead_costs, SUM(product_sales) - overhead_costs AS total_profit FROM products RIGHT JOIN departments ON products.department = departments.dept_name GROUP BY department, dept_id", function (err, depts) {

        // list header display messages
        ui.div(chalk.blue('\n-------------------------------------------------------------------------------'));
        ui.div(chalk.yellow('\n You are logged in to Fine Art Mart as: SUPERVISOR \n'));
        ui.div(chalk.red(' THE FOLLOWING ARE ALL DEPARTMENTS IN THE STORE:'));
        ui.div(chalk.blue('\n-------------------------------------------------------------------------------'));

        // create structured table headings using cliui
        ui.div({
            text: chalk.gray("id"),
            width: 5
        }, {
            text: chalk.yellow("department"),
            width: 15
        }, {
            text: chalk.green("sales"),
            width: 10
        }, {
            text: chalk.red("overhead"),
            width: 12
        }, {
            text: "profit",
            width: 10
        });

        ui.div(chalk.blue('-------------------------------------------------------------------------------\n'));

        // loop through each department object in (depts) array of objects
        for (let d = 0; d < depts.length; d++) {

            // variable for data object returned for each department
            var dep = depts[d];

            // create a blank line spacer between each row
            ui.div('');

            // output a structured table row for each dept using cliui
            ui.div({
                text: chalk.gray(dep.dept_id),
                width: 5
            }, {
                text: chalk.yellow(dep.department),
                width: 15
            }, {
                text: chalk.green(dep.dept_sales),
                width: 10
            }, {
                text: chalk.red(dep.overhead_costs),
                width: 12
            }, {
                text: dep.total_profit,
                width: 10
            });

        }

        // create a blank line as a spacer under the table
        ui.div('');

        // tell cliui to output all ui.div
        console.log(ui.toString());

        // call the Menu function again
        supervisorMenu();

    });

};


// =======================================================================================
// SECOND MENU OPTION, called by supervisorMenu() - allows the creation of a new dept
// =======================================================================================

function createNewDept() {

    // cliui HAS TO BE REQUIRED INSIDE A FUNCTION INDIVIDUALLY
    // OTHERWISE IT WILL REMEBER EVERYTHING THAT HAS BEEN PRINTED BEFORE
    // AND PRINT OUT ALL PREVIOUS ENTRIES WITH THE CURRENT RETURN
    var ui = require('cliui')();

    // header display messages
    console.log(chalk.blue('\n--------------------------------------------------------------------'));
    console.log(chalk.yellow('\n You are logged in to Fine Art Mart as: SUPERVISOR \n'));
    console.log(chalk.red(' ENTER THE FOLLOWING INFORMATION TO ADD A NEW DEPARTMENT TO THE STORE:'));
    console.log(chalk.blue('\n--------------------------------------------------------------------'));

    // ask for the name and overhead cost of the new department
    inquirer
        .prompt([{
                name: "deptName",
                type: "input",
                message: chalk.magenta("Enter the new department's name:"),
            },
            {
                name: "deptOverhead",
                type: "input",
                message: chalk.magenta("Enter the overhead cost of the new department:"),
                validate: function (input) {
                    input = input.replace(/\s+/g, "");
                    if (isFinite(input) && input != '') {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (newDept) {

            // connection query to insert the VALUES of the new department
            connection.query("INSERT INTO departments SET ?", {
                    dept_name: newDept.deptName,
                    overhead_costs: newDept.deptOverhead,
                },
                // this function's Response contains only confirmation feedback, no useable data
                function (err, feedback) {

                    if (err) throw err;

                    // follow-up connection query to confirm the addition of the new department, 
                    // and also to return its auto_incremented dept_id number
                    connection.query("SELECT * FROM departments WHERE ?", {
                            dept_name: newDept.deptName
                        },
                        function (err, newDep) {

                            if (err) throw err;

                            ui.div(chalk.blue('\n--------------------------------------------------------------------'));
                            ui.div(chalk.red('\n SUCCESS! You have added the following department to the store:'));
                            ui.div(chalk.blue('\n--------------------------------------------------------------------'));

                            // create structured table headings using cliui
                            ui.div({
                                text: chalk.green("\nDept ID\n"),
                                width: 10
                            }, {
                                text: chalk.green("\nDepartment\n"),
                                width: 15
                            }, {
                                text: chalk.green("\nOverhead\n"),
                                width: 15
                            });

                            // output a structured table row for each dept using cliui
                            ui.div({
                                text: newDep[0].dept_id,
                                width: 10
                            }, {
                                text: newDep[0].dept_name,
                                width: 15
                            }, {
                                text: newDep[0].overhead_costs,
                                width: 15
                            });

                            // tell cliui to output all ui.div
                            console.log(ui.toString());

                            // call the Menu function again
                            supervisorMenu();

                        }); // end connection.query(SELECT *) new select all to confirm added dept details

                }); // end connection.query(INSERT) new department

        }); // end inquirer

}; // end createNewDept()