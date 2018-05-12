var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.host,
  port: 3306,
  user: process.env.user,
  password: process.env.pass,
  database: "bamazon"
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Select Function. Hail Satan",
        choices: [
          "View Product Sales by Department",
          "Create New Department",
          "End Session"
        ]
      }
    ])
    .then(answer => {
      switch (answer.menu) {
        case "View Product Sales by Department":
          sales();
          break;
        case "Create New Department":
          // Dept();
          break;
        case "End Session":
          console.log("Hail Satan");
          connection.end();
          break;
      }
    });
}

function sales() {
  connection.query(
    "Select SUM(product_sales) AS total_profit,department FROM products GROUP BY department LEFT JOIN depts ON products.department=depts.dept",

    function(error, results, fields) {
      if (error) throw error;
      console.log(results);
    }
  );
}


init();


// Works to get sums of total sales by department in products table
// "Select SUM(product_sales) AS total_profit,department FROM products GROUP BY department",