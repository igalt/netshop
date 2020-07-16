import {Constants, Globals} from './globals.mjs';

export class Product{
    constructor(id, name, price, imageURL, shippableTo, hasVAT=true, category){
        this.id = id;
        this.name = name;
        this._price = price;
        this.shippableTo = shippableTo;
        this.imageURL = imageURL;
        this.hasVAT = hasVAT;
        this.category = category;
    }

    get price(){
        if (this.hasVAT){
            return Math.round(this._price * Constants.VAT);
        }
        return this._price;
    }

    set price(thePrice){
        this._price = thePrice;
    }
}