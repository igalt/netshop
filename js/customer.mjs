export class Customer{
    constructor(name, balance, imageURL){
        this.name = name;
        this.balance = balance;
        this.imageURL = imageURL;
    }

    buy (amount){
        // TODO: add a check if not going into a Minus
        // if check fails, throw exception

        this.balance -= amount;
    }

    static fromJSON(json){
        return Object.assign(new Customer(), json);
    }
}