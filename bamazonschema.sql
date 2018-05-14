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

