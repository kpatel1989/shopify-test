var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopify-test');
var ProductSchema = require(global.SERVER_PATH + "/db/product");
var Product = mongoose.model("Product",ProductSchema);

var saveProducts = function(products,callback) {
  var onInsert = function(err,docs) {
    if (err) {
      console.log(err);
    } else {
      callback(docs);
    }
  }
  Product.collection.insert(products,onInsert);
}

var getAllProducts = function(callback) {
    Product.find({}, function(err, products) {
      if (err) throw err;
      callback(products);
    });
}

var clearProductCollection = function(){
  Product.remove("",function(err){
    console.log(err);
  })
}

exports.clearProductCollection = clearProductCollection;
exports.saveProducts = saveProducts;
exports.getAllProducts = getAllProducts;