var http = require("http"),
    compression = require("compression"),
    express = require("express"),
    bodyParser = require('body-parser');
    shopify = require( global.SERVER_PATH + "/shopify"),
    mongo = require('mongodb');
    
function start() {
    var app = express();
    app.use(bodyParser.json());
    app.use('/js',express.static(global.CLIENT_PATH + '/js'));
    app.use('/css',express.static(global.CLIENT_PATH + '/css'));
    app.use('/index.html',express.static(global.CLIENT_PATH + '/index.html'));
    
    app.get("/", function (req, res) {
        res.sendFile(global.CLIENT_PATH + '/index.html');
    });

    app.get("/products",function(req,res){
        shopify.getProducts().then(products => res.send(products), error => console.log(error));
    });

    app.get("/products/download",function(req,res){
        shopify.clearCollection();
        shopify.pullCollection();
        res.send("Done");
    });

    app.post("/product/buy/:productId", function(req,res) {
        var productId = req.params.productId;
        console.log("Product to buy = " + productId);
    });

    var server = app.listen(5000, function () {
        console.log('Server running on http://localhost:5000');
    });
}

exports.start = start;