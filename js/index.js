// global variables
const VAT = 1.17;
const dbURL = "http://localhost:3000/"

let allProducts = [];
let customer;
let cart;

function updateCartTotals(){
    document.querySelector('#cartTotal').innerText = cart.totalPrice;
    document.querySelector('#cartTotalPrice').innerText = cart.totalPrice;
}

function renderProductInCart(product){
    let ulCart = document.querySelector('#cartProductsList');
    ulCart.insertAdjacentHTML('beforeend', 
            `<li data-product-id="${product.id}">
                <div>
                    <img class="thumbnail mr-1" src="${product.imageURL}">
                    ${product.name} $${product.price}
                </div>
                <div><button class="btn btn-sm btn-danger"><i class="fas fa-trash" aria-hidden="true"></i></button></div>
            </li>`);
    
    // Adding event listener to the "remove from cart" button
    ulCart.lastChild.querySelector('button').addEventListener("click", e =>{
       handleRemoveFromCart(e.target);
    });
    
    updateCartTotals();
}

function handleRemoveFromCart(btn){
    let liProd = btn.closest("li");
    let prodId = liProd.dataset.productId;
    let prod = allProducts.find(prod => prod.id == prodId);

    // remove from data
    cart.removeProduct(prod);

    // remove from DOM
    liProd.remove();

    updateCartTotals();
}

function handleAddToCart(btn){
    let prodId = btn.closest(".card").dataset.productId;
    let prod = allProducts.find(prod => prod.id == prodId);

    cart.addProduct(prod);
    renderProductInCart(prod);
}

function renderProductSection(category){
    let sectionRow = document.querySelector(`#${category}ProductsRow`); 
    let arrByCategory = allProducts.filter(prod => prod.category == category);

    arrByCategory.forEach(prod =>{

        sectionRow.insertAdjacentHTML('beforeend', 
            `<div class="col-md-6 col-lg-3">
                <div class="card" data-product-id="${prod.id}">
                    <img src="${prod.imageURL}" class="card-img-top product">
                    <div class="card-body">
                        <h6 title="${prod.name}">${prod.name}</h5>
                        <h6>$${prod.price}</h6>
                        <button class="btn"><i class="fas fa-cart-plus" aria-hidden="true"></i> Cart</button>
                    </div>
                </div>
            </div>`);
    });
}

function renderProducts(){
    renderProductSection('arts');
    renderProductSection('fashion');

    addProductsButtonEvents();

    /* let artProdRow = document.querySelector('#artProductsRow');
    let fashionProdRow = document.querySelector('#fashionProductsRow');

    let artProducts = allProducts.filter(prod => prod.category == "arts");
    let fashionProducts = allProducts.filter(prod => prod.category == "fashion");
    
    artProducts.forEach(prod =>{

        artProdRow.insertAdjacentHTML('beforeend', 
            `<div class="col-md-6 col-lg-3">
                <div class="card" data-product-id="${prod.id}">
                    <img src="img/art${prod.id}.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5>${prod.name}</h5>
                        <h6>$${prod.price}</h6>
                        <button class="btn btn-danger"><i class="fas fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
                    </div>
                </div>
            </div>`);
    });
    */
}

function loadProductsClassArray(arrProducts){
    arrProducts.forEach(prod => {
        allProducts.push(Product.fromJSON(prod));
    })
}

function addProductsButtonEvents(){
    // Add event listeners for product buttons
    document.querySelectorAll('.card .btn').forEach(btn =>{
        btn.addEventListener('click', (e) => {
            handleAddToCart(e.target)
        });
    });
}

function loadProducts(){
    let products;

    fetch(dbURL + 'products').then(response => {
        // This means the API call was successful!
        // Now we convert the stream data to readable JSON
        return response.json();
    }).then(data => {
        // This is the actual JSON from our response

        // Converting from JSON to classes 
        let arrProducts = data;
        loadProductsClassArray(arrProducts);
        
        // Now we fill the DOM with products
        renderProducts();

        

    }).catch(function (err) {
        // There was an error
        console.warn('Product fetch went wrong.', err);
    });

}

function renderCustomerDetails(){
    document.querySelector('#username').innerText = customer.name;
    document.querySelector('#userBalance').innerText = customer.balance;
    document.querySelector('#profilePic').src = customer.imageURL;

}

function loadCustomer(){
    fetch(dbURL + 'customer').then(function (response) {
        // This means the API call was successful!
        // Now we convert the stream data to readable JSON
        return response.json();
    }).then(function (data) {
        // This is the actual JSON from our response

        // Converting from JSON to classes 
        customer = Customer.fromJSON(data);

        // Now we fill the DOM with products
        renderCustomerDetails();

        

    }).catch(function (err) {
        // There was an error
        console.warn('Customer fetch went wrong.', err);
    });
}

function renderShoppingCartDetails(){
    document.querySelector('#cartTotal').innerText = cart.totalPrice;
    cart.products.forEach(prod => {
        renderProductInCart(prod);
    });
}

function loadShoppingCart(){
    // first, we try to get the data from localStorage
    let dataCart = Data.loadData("cart");
    if (dataCart){
        cart = ShoppingCart.fromJSON(dataCart)
        // Now we fill the DOM with products
        renderShoppingCartDetails();
    }
    // if it doesn't exist, get it from db.json
    else{
        fetch(dbURL + 'cart').then(function (response) {
            // This means the API call was successful!
            // Now we convert the stream data to readable JSON
            return response.json();
        }).then(function (data) {
            // This is the actual JSON from our response

            // Converting from JSON to classes 
            cart = ShoppingCart.fromJSON(data);

            // Now we fill the DOM with products
            renderShoppingCartDetails();

            

        }).catch(function (err) {
            // There was an error
            console.warn('Shopping Cart fetch went wrong.', err);
        });
    }
}

window.onload = function(){

    // Loading products from JSON
    this.loadProducts();

    // loading Customer from localStorage / JSON
    this.loadCustomer();

    // loading ShoppingCart from localStorage / JSON
    this.loadShoppingCart();
    
}

window.onbeforeunload = function(){
    // Saving data before user leaves the site
    Data.saveData();
}