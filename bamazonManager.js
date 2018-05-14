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
//initates menu and runs function based on user selection
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View Products",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "End Session"
        ]
      }
    ])
    .then(answer => {
      switch (answer.menu) {
        case "View Products":
          display();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addItem();
          break;
        case "End Session":
          console.log("Hail Satan");
          connection.end();
          break;
      }
    });
}
start();
//displays all the available products
function display() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("Welcome to Bamazon Manager Interface. Hail Satan.");
    console.log(
      "-----------------------------------------------------------------------"
    );
    for (var i = 0; i < res.length; i++) {
      console.log(
        `ITEM ID:${res[i].id}  ITEM NAME:${res[i].item}  DEPARTMENT:${
          res[i].department
        }  PRICE:$${res[i].price}`
      );
    }
    start();
  });
}
//dispalys all productys with inventory under 50
function lowInventory() {
  connection.query("select * from products where stock < 50", function(
    err,
    res
  ) {
    if (err) throw err;
    // console.log(res);
    console.log("Welcome to Bamazon Manager Interface. Hail Satan.");
    console.log(
      "-----------------------------------------------------------------------"
    );
    for (var i = 0; i < res.length; i++) {
      console.log(
        `ITEM ID:${res[i].id}  ITEM NAME:${res[i].item}  DEPARTMENT:${
          res[i].department
        }  PRICE:$${res[i].price}  STOCK:${res[i].stock}`
      );
    }
    start();
  });
}
//adds inventory to an existing item on the products table
function addInventory() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Please enter the id of the Item requiring inventory"
      },

      {
        name: "quantity",
        type: "input",
        message: "How much inventory are you adding?"
      }
    ])
    .then(answer => {
      var item = answer.item;
      var amount = answer.quantity;
      var newStock;
      connection.query(`select * from products where id =${item}`, function(
        err,
        res
      ) {
        if (err) throw err;
        newStock = res[0].stock + amount;

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock: newStock
            },
            {
              id: item
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(" inventory updated!\n");

            start();
          }
        );
      });
    });
}
//adds item to products table
function addItem() {
  console.log("Item Creation Screen. Satan be with you.");
  inquirer
    .prompt([
      {
        name: "newItem",
        type: "input",
        message: "Enter new item name"
      },
      {
        name: "newDept",
        type: "input",
        message: "Enter new item department"
      },
      {
        name: "newPrice",
        type: "input",
        message: "Enter new item price"
      },

      {
        name: "newStock",
        type: "input",
        message: "Enter new item inventory"
      }
    ])
    .then(answers => {
      connection.query(
        "INSERT INTO products set ?",

        {
          item: answers.newItem,

          department: answers.newDept,

          price: answers.newPrice,

          stock: answers.newStock
        },
        function(error, results, fields) {
          if (error) throw error;
          console.log("Item successfully created");
        }
      );
      start();
    });
}
