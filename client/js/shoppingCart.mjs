import {Constants, Globals} from './globals.mjs';
import {Product} from './product.mjs';

export class ShoppingCart{
    constructor(){
        this.initCart();
    }

    initCart(){
        this.products = [];
        this.checkedOut = false;
    }

    addProduct(product){
        this.products.push(product);
    }

    removeProduct(product){
        let idx = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(idx, 1);
    }

    get totalPrice(){
        let sum = 0;
        this.products.forEach((product) =>{
          sum += product.price;
        });
        return sum;
    }


    checkout(customer){
        if (customer.balance >= this.totalPrice){
            customer.buy(this.totalPrice);
            this.checkedOut = true;
        }else{
            throw new Error("customer ain't got the money");
        }
    }

    ship(country){
        // checking if cart is already checkedOut
        if (this.checkedOut){
            // checking if all products are shippable to country
            this.products.forEach((product) =>{
                if(!product.shippableTo.includes(country)){
                    throw new Error (`can't ship ${product.name} to ${country}!`);
                } 
            });

            // If no exceptions thrown, all good
            // we clear the shopping cart
            this.initCart();
            
            return true;
        } else{
            throw new Error ("Cart isn't checked out!");
        }
    }

    static fromJSON(jsonCart){
        let cart = Object.assign(new ShoppingCart(), jsonCart);

        if (jsonCart.products && jsonCart.products.length > 0){
            // Clearing the Products' JSON data
            cart.products = [];
            
            // Loading the products' classes 
            jsonCart.products.forEach(prod => {
                let objProd = Object.assign(new Product(), prod);
                cart.addProduct(objProd);
            });
        }
        return cart;            
    }
}