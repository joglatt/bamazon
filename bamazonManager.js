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
        }  PRICE:$${res[i].price}`
      );
    }
    start();
  });
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message:
          "Please enter the id of the Item you want to add inventory for."
      },

      {
        name: "quantity",
        type: "input",
        message: "How much inventory are you adding?"
      }
    ])
    .then(function(answer) {
      var item = answer.item;
      var amount = answer.quantity;
      var newStock;
      connection.query(
        `select * from products where id =${answer.item}`,
        function(err, res) {
          if (err) throw err;
          if (res[0].stock > amount) {
            newStock = res[0] + amount;
            // console.log(res);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  quantity: newStock
                },
                {
                  id: item
                }
              ],
              function(error) {
                if (error) throw err;
                console.log(res[0] + " inventory updated!\n");
                start();
              }
            );
          } else {
            // console.log(res);
            console.log("Not enough in stock");
            start();
          }
        }
      );
    });
}

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
    });
}
