const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');

// Initializing Server
const app = express(); //express is a function that returns an instance

//app.use(cors()) // enabling cross origin requests
app.use(express.json()); // this makes it easier to process JSON requests 
app.use(express.static('client')); // serving  our front-end client files with this server

app.listen(8000, () => console.log('Netshop API is listening on port 8000... '));

// connecting to MongoDB
const mongoURL = "mongodb://localhost/netshopDB"; // connection string

mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongoURL, { useNewUrlParser: true })
        .then(() => console.log('connected to MongoDB'))
        .catch(err => console.error(err));
        

// a Schema is a way of defining how our data looks like in MongoDB
// Supported types are: 
// String, Number, Date, 
// Buffer (for storing binary data), Boolean and ObjectID.
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageURL: String,
  shippableTo: [ String ],
  hasVAT: Boolean,
  category: String
});

// this duplicates the "_id" field as an "id" field in JSON
productSchema.set('toJSON', {
  virtuals: true
});

// a Model is used to create a Class definition (not an instance!)
// based on the Schema.
// this class also helps us to communicate with the DB
const Product = mongoose.model('Product', productSchema); // Product is a class


app.get('/api/products', (req, res) =>{
  Product.find({ category: 'arts', price: {$gt: 100}})
         .sort('-price')
         .select('name, price')
         .limit(5)
         .then(data => res.send(data));
});

app.get('/api/products/:id', (req, res) =>{
  let reqId = req.params.id; 
  Product.findById(reqId)
         .then(data => {
           if (data){
              res.send(data)
           } else{
              res.status(404).send(`404: product #${req.params.id} wasn't found`);
           }
         });

});

app.post('/api/products', (req, res) =>{
  // creating a new product based on our Model
  let newProd = new Product({
    name: req.body.name,
    price: req.body.price,
    imageURL: req.body.imageURL,
    shippableTo: req.body.shippableTo,
    hasVAT: req.body.hasVAT,
    category: req.body.category  
  });

  newProd.save() // returns a promise
         .then(() => {
            res.send(newProd)
         })
         .catch((err) => console.error(err))
});
 
app.put('/api/products/:id', (req, res) => {
  Product.findById(req.params.id).then(product => {
    if (product){
      // update product
      product.name = req.body.name; 
      product.price = req.body.price;
      product.imageURL = req.body.imageURL;
      product.shippableTo = req.body.shippableTo;
      product.hasVAT = req.body.hasVAT;
      product.category = req.body.category;

      product.save()
             .then(() => res.send(JSON.stringify(product)));

    }else{
      res.status(404).send(`404: product #${req.params.id} wasn't found`);
    }
  })
});

app.delete('/api/products/:id', (req,res) =>{
  
  Product.findByIdAndRemove(req.params.id)
         .then(product => {
           if (product){
              res.send(JSON.stringify(product));
           } else{
              res.status(404).send(`404: product #${req.params.id} wasn't found`);
           }
         });
}); 