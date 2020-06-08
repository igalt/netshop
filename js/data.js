const localStorageName = "netshopData";
const customerURL = "http://localhost:3000/customer";
const productsURL = "http://localhost:3000/products";
const cartURL = "http://localhost:3000/cart";

class Data{
    static saveData(){

        let jsonData = {
            "customer": customer,
            "products": allProducts,
            "cart": cart
        };

        localStorage.setItem(localStorageName, JSON.stringify(jsonData));
    }

    static loadData(objName){
        let item = localStorage.getItem(localStorageName);
        if (item){
          return JSON.parse(item)[objName];
        }
    }



}