var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

// Consider changing the connection to pool connection if there is time. In mysql npm
var connection = mysql.createConnection({
  host: process.env.host,
  port: 3306,

  // Your username
  user: process.env.user,

  // Your password
  password: process.env.pass,
  database: "bamazon"
});
// connect to the mysql server and sql database
connection.connect(function(err, res) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  display();
});
function display() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log(
      "Welcome to Bamazon. We value you as a customer. God Bless you"
    );
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
//displays interface allowing user to purchase item
function start() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Please enter the id of the Item you would like to purchase?"
      },

      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
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
          if (res[0].stock >= amount) {
            var sales=res[0].product_sales+(amount*res[0].price)
            newStock= res[0].stock-amount
            // console.log(res);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock:newStock,
                  product_sales:sales
                },
                {
                  id:item
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Purchase confirmed. Have a blessed day.");
                connection.end();
              }
            );
          } else {
            // console.log(res);
            console.log("Sorry not enough in stock but please remember life itself is still a blessing");
            start();
          }
        }
      );
    });
    
}



