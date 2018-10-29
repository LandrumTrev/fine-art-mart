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


    // connect to database and get the SUM of all product_sales by department
    connection.query("SELECT department, SUM(product_sales) AS total_sales FROM products GROUP BY department", function (err, sales) {

        // console.log(sales);
        // console.log(sales[0].department);
        // console.log(sales[0].total_sales);

        var deptSalesArray = [];

        for (let p = 0; p < sales.length; p++) {

            var deptSales = {[sales[p].department]: sales[p].total_sales};

            deptSalesArray.push(deptSales);

        }

        // console.log(deptSalesArray);
        // console.log(deptSalesArray[0]);
        console.log(Object.keys(deptSalesArray[0]) + " " + Object.values(deptSalesArray[0]));
        console.log(Object.keys(deptSalesArray[1]) + " " + Object.values(deptSalesArray[1]));

        connection.end();
        return;

    });



    // // connect to database and get all items from the products table
    // connection.query("SELECT * FROM departments", function (err, resDept) {

    //     if (err) throw err;

    //     // table headings cliui code
    //     ui.div({
    //         text: chalk.green("\nDept ID\n"),
    //         width: 10,
    //         padding: [0, 0, 0, 0]
    //     }, {
    //         text: chalk.green("\nDept Name\n"),
    //         width: 20,
    //         padding: [0, 0, 0, 0]
    //     }, {
    //         text: chalk.green("\nOverhead Costs\n"),
    //         width: 20,
    //         padding: [0, 0, 0, 0]
    //     }, {
    //         text: chalk.green("\nProduct Sales\n"),
    //         width: 20,
    //         padding: [0, 0, 0, 0]
    //     }, {
    //         text: chalk.green("\nTotal Profit\n"),
    //         width: 20,
    //         padding: [0, 0, 0, 0]
    //     });

    //     // loop through each dept in "departments" table
    //     for (let d = 0; d < resDept.length; d++) {

    //         // department variable for each dept looped
    //         var department = resDept[d];

    //         // each department's row cliui code
    //         ui.div({
    //             text: department.dept_id,
    //             width: 10,
    //             padding: [0, 0, 0, 0]
    //         }, {
    //             text: department.dept_name,
    //             width: 20,
    //             padding: [0, 0, 0, 0]
    //         }, {
    //             text: department.overhead_costs,
    //             width: 20,
    //             padding: [0, 0, 0, 0]
    //         }, {
    //             text: department.overhead_costs,
    //             width: 20,
    //             padding: [0, 0, 0, 0]
    //         }, {
    //             text: department.overhead_costs,
    //             width: 20,
    //             padding: [0, 0, 0, 0]
    //         });


    //     }

    //     ui.div('');
    //     console.log(ui.toString());



    // });

    // connection.end();
    // return;

};