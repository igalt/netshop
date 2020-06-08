# NetShop

**General:** In this project we will build an online shopping site using the following technologies:

* HTML, CSS, JS (Es6)
* Sass
* Bootstrap4
* Font Awesome (for icons)
* json & json-server
* localstorage

## Step 1 - showing products
* display all the products in /products
* Each product will show it's image, title, quantity and an "Add to cart" button
* pressing "Add to cart" will add the product to the cart area on the right.

* Uselaunch the server using db.json.
  
## Step 2 - the cart

* the cart will display a line for each item, showing name and price
* at the bottom of the cart we'll show the total price and a "Order" button
* refreshing the page will keep the products in the cart (use localstorage)

## Step 3 - ordering

* pressing the "Order" button will:
  * add a new order entity in the server, containing all the ordered product id's and the total price
  * clear the cart

## Software design

* remember DRY

## UI/UX
* the design will be a single page with the products on the left and the cart on the right.
* make it as beautiful as possible
* think mobile first!
* feel free to use BS4 elements such as Buttons, Cards (for product images), Carouseles etc.
* for copyright-free high-quality pics you can use Pexels
* here are some sites for inspiration:
  * https://www.shoes.com/mens-shoes-all/category_176
  * https://www.next.co.il/en/shop/gender-newborngirls-gender-unisex-productaffiliation-newborn-0
  * https://www.asos.com/men/ctas/key-pieces/look-4/cat/?cid=15138&nlid=mw|clothing|shop+by+product 


## Bonus features

* show only x products on load and add infinite scroll to load extra products
* add +/- buttons to the shopping cart to change the quantity