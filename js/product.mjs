import {Constants, Globals} from './globals.mjs';

export class Product{
    constructor(id, name, price, shippableTo, hasVAT=true){
        this.id = id;
        this.name = name;
        this._price = price;
        this.shippableTo = shippableTo;
        this.hasVAT = hasVAT;
    }

    get price(){
        if (this.hasVAT){
            return Math.round(this._price * Constants.VAT);
        }
        return this._price;
    }

    static fromJSON(json){
        return Object.assign(new Product(), json);
    }

}