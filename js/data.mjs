import {Constants, Globals} from './globals.mjs';

const localStorageName = "netshopData";
const productsURL = "http://localhost:8000/products";
const customerURL = "http://localhost:8000/customer";
const cartURL = "http://localhost:8000/cart";

//const customerURL = "http://localhost:3000/customer";
//const productsURL = "http://localhost:3000/products";
//const cartURL = "http://localhost:3000/cart";

export class Data{

    static getProducts(){
      return fetch(productsURL).then(response => {
          return response.json();
      });
    }

    static getCustomer(){
      // first, we try to get the data from localStorage
      let dataCart = this.getLocalStorageData("customer");

      if (dataCart){
          return Promise.resolve(dataCart);
      } else{// if it doesn't exist, get it from db.json
        return fetch(customerURL).then(function (response) {
          // This means the API call was successful!
          // Now we convert the stream data to readable JSON
          return response.json();
        })
      }
    }

    static getShoppingCart(){
      // first, we try to get the data from localStorage
      let dataCart = this.getLocalStorageData("cart");

      if (dataCart){
          return Promise.resolve(dataCart);
      }
      else{ // if it doesn't exist, get it from db.json
        return fetch(cartURL).then(function (response) {
          // This means the API call was successful!
          // Now we convert the stream data to readable JSON
          return response.json();
        })
      }
    }

    static saveLocalStorageData(){
      /*let customer = new Customer("Igal", 500, "img/igal.jpg");
      let cart = new ShoppingCart();*/

      let jsonData = {
          "customer": Globals.customer,
          "products": Globals.allProducts,
          "cart": Globals.cart
      };

      localStorage.setItem(localStorageName, JSON.stringify(jsonData));
    }

    static getLocalStorageData(objName){
        let item = localStorage.getItem(localStorageName);
        if (item){
          return JSON.parse(item)[objName];
        }
    }



}