import {Customer} from './customer.mjs';
import {ShoppingCart} from './shoppingCart.mjs';
import {Product} from './product.mjs';
import {Data} from './data.mjs';
import {Constants, Globals} from './globals.mjs';

function updateCartTotals(){
    document.querySelector('#cartTotal').innerText = Globals.cart.totalPrice;
    document.querySelector('#cartTotalPrice').innerText = Globals.cart.totalPrice;
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
    let prod = Globals.allProducts.find(prod => prod.id == prodId);

    // remove from data
    Globals.cart.removeProduct(prod);

    // remove from DOM
    liProd.remove();

    updateCartTotals();
}

function handleAddToCart(btn){
    let prodId = btn.closest(".card").dataset.productId;
    let prod = Globals.allProducts.find(prod => prod.id == prodId);

    Globals.cart.addProduct(prod);
    renderProductInCart(prod);
}

function renderProductSection(category){
    let sectionRow = document.querySelector(`#${category}ProductsRow`); 
    let arrByCategory = Globals.allProducts.filter(prod => prod.category == category);

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
}

function loadProductsClassArray(arrProducts){
    arrProducts.forEach(prod => {
        // let newProd = Product.fromJSON(prod);
        let newProd = new Product(prod.id, prod.name, prod.price, prod.imageURL, prod.shippableTo, prod.hasVAT, prod.category);
        
        Globals.allProducts.push(newProd);
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
    Data.getProducts().then(data => {
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
    
    document.querySelector('#username').innerText = Globals.customer.name;
    document.querySelector('#userBalance').innerText = Globals.customer.balance;
    document.querySelector('#profilePic').src = Globals.customer.imageURL;

}

function loadCustomer(){
    Data.getCustomer().then(function (data) {
        // Converting from JSON to classes 
        Globals.customer = Customer.fromJSON(data);

        // Now we fill the DOM with products
        renderCustomerDetails();

    }).catch(function (err) {
        // There was an error
        console.warn('Customer fetch went wrong.', err);
    });
}

function renderShoppingCartDetails(){
    document.querySelector('#cartTotal').innerText = Globals.cart.totalPrice;
    Globals.cart.products.forEach(prod => {
        renderProductInCart(prod);
    });
}

function loadShoppingCart(){
    Data.getShoppingCart().then(function (data) {
        if (data){
            // Converting from JSON to classes 
            Globals.cart = ShoppingCart.fromJSON(data);
        } else{
            Globals.cart = new ShoppingCart();
        }


        // Now we fill the DOM with products
        renderShoppingCartDetails();

    }).catch(function (err) {
        // There was an error
        console.warn('Shopping Cart fetch went wrong.', err);
    });
}

window.onload = function(){

    // Loading products from JSON
    loadProducts();

    // loading Customer from localStorage / JSON
    loadCustomer();

    // loading ShoppingCart from localStorage / JSON
    loadShoppingCart();
    
    // event listener for checkout buttons
    document.querySelector('#btnOpenCheckoutModal').addEventListener("click", e => {
        document.querySelector('#checkoutSummary').innerText = `Your total is $${Globals.cart.totalPrice}`;
    });

    document.querySelector('#btnCheckout').addEventListener('click', e => {
        try{
            Globals.cart.checkout(Globals.customer);
            Globals.cart.ship(document.querySelector('#ddlCountry').value)
            document.querySelector('#shippingSuccess').classList.remove('d-none');
        } catch (err){
            document.querySelector('#shippingError').classList.remove('d-none');
        }
    });
}

window.onbeforeunload = function(){
    // Saving data before user leaves the site
   Data.saveLocalStorageData();
}