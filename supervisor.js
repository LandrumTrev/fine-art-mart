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


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "fineartmart_db"
});


connection.connect(function (err) {

    if (err) throw err;

    console.log("Supervisor.js connected");
    console.log("Supervisor.js disconnecting, bye bye.");
    connection.end();
    return;

    // displayInventory();
});


// =======================================================================================
// FIRST FUNCTION, xxx
// =======================================================================================