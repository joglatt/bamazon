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
          addDept();
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
    "SELECT dept, dept_id, overhead, (SUM(product_sales) - overhead )AS profit FROM products LEFT JOIN depts ON products.department=depts.dept GROUP BY department ",

    function(error, res, fields) {
      if (error) throw error;
      for (var i = 0; i < res.length; i++) {
        console.log(
          `DEPT ID:${res[i].dept_id}  DEPARTMENT:${res[i].dept}  OVERHEAD:${
            res[i].overhead
          }  PROFIT:$${res[i].profit}`
        );
      }
    }
  );
  init();
}
function addDept() {
  console.log("Department Creation Screen. Lucifer is Bringer of Light.");
  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "Enter new Department name"
      },
      {
        name: "overhead",
        type: "input",
        message: "Enter projected overhead costs"
      }
    ])
    .then(answers => {
      connection.query(
        "INSERT INTO depts set ?",

        {
          dept: answers.dept,

          overhead: answers.overhead
        },
        function(error, results, fields) {
          if (error) throw error;
          console.log(
            "Department created.The Dark Master brings Wisdom to All"
          );
        }
      );
    });
    init();
}

init();

// Works to get sums of total sales by department in products table
//     "SELECT SUM(product_sales) AS total_profit,department FROM products LEFT JOIN depts ON products.department=depts.dept GROUP BY department ",
