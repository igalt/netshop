const express = require('express');
const cors = require('cors');  
const http = require('http');
const fs = require('fs');
const util = require('util');

// Initializing Server
const app = express(); //express is a function that returns an instance
app.use(cors()) // enabling cross origin requests

// Getting the application root directory
let appRoot = process.cwd() + '/server/';

app.listen(8000, () => console.log('Netshop API is listening on port 8000... '));

// Creating a listener for products
app.get('/products', (request, response) =>{
    getResponseForObject(response, 'products');
});

function getResponseForObject(response, objName){
  getFile(appRoot + '/db.json')
  .then(data =>
     {
      let ret = JSON.stringify(returnObjFromJSON(data, objName));
      response.end(ret);
     })
  .catch(err => handleFileError(request, response, err))

}

function returnObjFromJSON(json, objName){
  return JSON.parse(json)[objName];
} 
  
function getFile(pathName) {
    return util.promisify(fs.readFile)(pathName);
}

function handleFile(request, response, data) {
    response.end(data);
}

function handleFileError(request, response, err) {
  if (err.code === 'ENOENT') {
    sendStatus(request, response, 404);
    return;
  }
  sendStatus(request, response, 500);
}

  function sendStatus(request, response, statusCode, err) {
    response.writeHead(statusCode, {'Content-Type': 'text/plain'});
    if (err){
      response.write(err.message);
    }
    response.end(http.STATUS_CODES[statusCode]);
  }