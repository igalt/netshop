const express = require('express');
const mongo = require('mongodb');
const cors = require('cors');

// Initializing Server
const app = express(); //express is a function that returns an instance
app.use(cors()) // enabling cross origin requests

app.listen(8000, () => console.log('Netshop API is listening on port 8000... '));

const mongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017/Netshop";

// Creating a listener for products
app.get('/products', (request, response) =>{
  mongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db();
    dbo.collection("products").find().toArray(function(err, result) {
      if (err) throw err;
      
      // closing the DB Connection
      db.close();

      // Returning results
      let sRes = JSON.stringify(result)
      response.end(sRes);
    });
  });
});
