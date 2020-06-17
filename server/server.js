let http = require('http');
let url = require('url');
let qs = require('querystring');
let fs = require('fs');
let util = require('util');

// Initializing Server
let server = http.createServer(onRequest);
server.listen(8000);
 
// Getting the application root directory
let appRoot = process.cwd() + '/server/';

 // Handling requests
function onRequest(request, response) {
    // Setting response to allow Cross Origin Resource Sharing (CORS)
    // Temporary solution...
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');

    let urlObj = url.parse(request.url);
    
    if (urlObj.pathname === '/products') {    
      getResponseForObject(response, 'products');
    } else if (urlObj.pathname === '/cart'){
      getResponseForObject(response, 'cart');
    } else if (urlObj.pathname === '/customer'){
      getResponseForObject(response, 'customer');
    } else{
      response.end('Resource not found');
    }
}

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