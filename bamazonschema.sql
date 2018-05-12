DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  department VARCHAR(100) NULL,
  price decimal(10,2) NOT NULL,
  stock integer(10) NOT NULL,
  PRIMARY KEY (id)
);

alter table products
add product_sales decimal(20,2);

select * from products;


CREATE TABLE depts(
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept VARCHAR(100) NULL,
  overhead decimal(20,2) NOT NULL,
  PRIMARY KEY (dept_id)
);



-- Select products.department, sum (product_sales) as total_money from product_sales
-- LEFT JOIN products on departments.dept = products.department
    -- "Select SUM(product_sales),department AS total_money FROM products LEFT JOIN products ON departments.dept = products.department;",

