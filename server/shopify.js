var http = require("http");
const Shopify = require('shopify-api-node');

var db = require(global.SERVER_PATH + '/db/db');

const shopify = new Shopify({
  shopName: 'gointegrations-devtest',
  apiKey: 'edd7fd7dac31cb81df28f91455649911',
  password: '330c304080eb8a70845b94ad0269bc50'
});

var pullCollection = function() {
	console.log("Pulling Data from shopify");
	shopify.product.list()
		.then(saveProductsToDB)
        .catch(err => console.error(err));

}

var saveProductsToDB = function(products) {
	db.saveProducts(products,function(docs){
		console.log("Saved to DB");
	});
}

var getProducts = function() {
	return new Promise(function(resolve,reject) {
		db.getAllProducts(products => resolve(products));
	});
}

var clearCollection = function() {
	db.clearProductCollection();
}

exports.pullCollection = pullCollection;
exports.getProducts = getProducts;
exports.clearCollection = clearCollection;