# Shopping Cart

## create a `ShoppingCart` class with the following funcionality

### methods
* `addProduct(product)` - will add a product to the shopping cart
* `get totalPrice()` - returns the total price
* `checkout(customer)` - will checkout the shopping cart, updating the customer balance. throw exception if the customer hasn't got enough money
* `ship(country)` - will ship all the products to the selected country, only if the cart is already checked out.
If not, it will throw an exception.
ship will also throw an exception if any product is not shippable to the specified country. 
successful `ship` will clear the shopping cart

## create a `Product` class 

### constructor(name, price, shippableTo, hasVAT)
* shipabbleTo ex. ['israel','usa','france']
* hasVAT - should add 17% the price 

## Create a `Customer` class

### constructor(name, balance)
* balance - the amount of money the customer has

### methods
* `buy(amount)` - updates the person balance

## Notes
use ES6 Modules to divide your code to 4 files:
one for each class and `index.js` to activate it all.

all javascript files should be under a 'js' folder

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Exporting_module_features