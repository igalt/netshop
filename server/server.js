const express = require('express');
const cors = require('cors')

let products = [
    
        "id": 1,
        "name": "Wave Art",
        "price": 80,
        "imageURL": "img/arts1.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "arts"
    },
    {
        "id": 2,
        "name": "Eye Gazer",
        "price": 120,
        "imageURL": "img/arts2.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "arts" 
    },
    {
        "id": 3,
        "name": "Scenic Stones",
        "price": 150,
        "imageURL": "img/arts3.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "arts"
    },
    {
        "id": 4,
        "name": "Fractal",
        "price": 140,
        "imageURL": "img/arts4.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "arts" 
    },
    {
        "id": 5,
        "name": "Tribal #1",
        "price": 200,
        "imageURL": "img/arts5.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "arts"
    },
    {
        "id": 6,
        "name": "Tribal #2",
        "price": 250,
        "imageURL": "img/arts6.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "arts" 
    },
    {
        "id": 7,
        "name": "Abstract Painting",
        "price": 70,
        "imageURL": "img/arts7.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "arts"
    },
    {
        "id": 8,
        "name": "Geometric Patterns",
        "price": 90,
        "imageURL": "img/arts8.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": true,
        "category": "arts" 
    },  {
        "id": 9,
        "name": "Dog Jacket",
        "price": 35,
        "imageURL": "img/fashion9.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "fashion"
    },
    {
        "id": 10,
        "name": "Drink Beer t-shirt",
        "price": 13,
        "imageURL": "img/fashion10.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "fashion" 
    },   {
        "id": 11,
        "name": "Sports Jacket",
        "price": 70,
        "imageURL": "img/fashion11.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "fashion"
    },
    {
        "id": 12,
        "name": "Psychedelic t-shirt",
        "price": 50,
        "imageURL": "img/fashion12.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "fashion" 
    },   {
        "id": 13,
        "name": "Elegant Jacket",
        "price": 150,
        "imageURL": "img/fashion13.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "fashion"
    },
    {
        "id": 14,
        "name": "Sports Jacket",
        "price": 220,
        "imageURL": "img/fashion14.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "fashion" 
    },   
    {
        "id": 15,
        "name": "White Top",
        "price": 60,
        "imageURL": "img/fashion15.jpg",
        "shippableTo": [
            "Israel"
        ],
        "hasVAT": true,
        "category": "fashion"
    },
    {
        "id": 16,
        "name": "Corona Cap",
        "price": 15,
        "imageURL": "img/fashion16.jpg",
        "shippableTo": [
            "Israel",
            "France"
        ],
        "hasVAT": false,
        "category": "fashion" 
    }
]

// Initializing Server
const app = express(); // express is a function that returns an instance

app.use(cors()); // this enables use to recieve request from other domains
app.use(express.json()); // this makes it easier to process JSON requests 

app.listen(8000, () => console.log('Our server is listening on port 8000... '));  // Now we're live!

// handle request to 'home page'
app.get('/', (req, res) =>{
    res.write('Welcome to our Netshop server!');
    res.end();
});

// Handle request to get all products
app.get('/api/products', (req, res) =>{
    // res.send is like using res.write & res.end
    res.send(JSON.stringify(products));
});

// Handle request to get one product by id
app.get('/api/products/:id', (req, res) =>{
    let reqId = parseInt(req.params.id); 
    let product = products.find(prod => prod.id == reqId);
    if (product){
        res.send(JSON.stringify(product));
    } else{
        res.status(404).send(`404: product #${req.params.id} wasn't found`);
    }

});

// Handle request to post new product
app.post('/api/products', (req, res) => {
    
    // Finding the heighest current ID
    let latestIdx = products[products.length - 1].id;

    let newProd = {
        id: latestIdx + 1,
        name: req.body.name, // we have this thanks to express.json()
        price: req.body.price,
        imageURL: req.body.imageURL,
        shippableTo: req.body.shippableTo,
        hasVAT: req.body.hasVAT,
        category: req.body.category
    }

    // Adding the new product to the array
    products.push(newProd);

    // return the new product to the client
    res.status(201).send(JSON.stringify(newProd));
});

// Handle 'put' request to update a product
app.put('/api/products/:id', (req, res) => {
    let product = products.find(prod => prod.id == parseInt(req.params.id));
    if (product){
        // update product
        product.name = req.body.name; // we have this thanks to express.json()
        product.price = req.body.price;
        product.imageURL = req.body.imageURL;
        product.shippableTo = req.body.shippableTo;
        product.hasVAT = req.body.hasVAT;
        product.category = req.body.category;

        // return the updated product to the client
        res.send(JSON.stringify(product));
    } else{
        res.status(404).send(`404: product #${req.params.id} wasn't found`);
    }
});

app.delete('/api/products/:id', (req,res) =>{
    let product = products.find(prod => prod.id == parseInt(req.params.id));
    if (product){
        // deleting the product
        let idx = products.indexOf(product);
        products.splice(idx, 1);

        // returning the deleted product
        res.send(JSON.stringify(product));
    } else{
        res.status(404).send(`404: product #${req.params.id} wasn't found`);
    }
}); 