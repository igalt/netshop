let http = require('http');
let url = require('url');
let mongo = require('mongodb');


// Initializing Server
let server = http.createServer(onRequest);
server.listen(8000);

let mongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017/Netshop";


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
        mongoClient.connect(mongoUrl, function(err, db) {
            if (err) throw err;
            var dbo = db.db();
            //var query = { address: "Park Lane 38" };
            dbo.collection("products").find().toArray(function(err, result) {
              if (err) throw err;
              
              // closing the DB Connection
              db.close();

              // Returning results
              let sRes = JSON.stringify(result)
              response.end(sRes);
            });
          });
    } else{
        response.end('Resource not found');
    }
}