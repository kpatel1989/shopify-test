var http = require("http");
const shopName = 'gointegrations-devtest';
const apiKey = 'edd7fd7dac31cb81df28f91455649911';
const password = '330c304080eb8a70845b94ad0269bc50';
const sharedSecret = "a830be1921b796ad7eb9ad13ec16abdc";

const Shopify = require('shopify-api-node');
var shopifyAPI = require('shopify-node-api');

var db = require(global.SERVER_PATH + '/db/db');

const shopify = new Shopify({
  shopName: shopName,
  apiKey: apiKey,
  password: password
});

shopifyAuth = new shopifyAPI({
	shop: shopName, // MYSHOP.myshopify.com 
	shopify_api_key: apiKey, // Your API key 
	shopify_shared_secret: sharedSecret, // Your Shared Secret 
	shopify_scope: "read_products,read_draft_orders,write_draft_orders",
	redirect_uri: 'http://localhost:5000/shopify/auth',
	nonce: '12345780' // you must provide a randomly selected value unique for each authorization request 
});
var auth_url = shopifyAuth.buildAuthURL();
console.log(auth_url);

var pullCollection = function(callback) {
	console.log("Pulling Data from shopify");
	shopify.product.list()
		.then(products => {
			saveProductsToDB(products);
			callback(products);
		})
        .catch(err => console.error(err));

}

var addInventory = function(variantDetails) {
	return new Promise(function(resolve, reject) {
		var params = {
			id : variantDetails.variantId,
			inventory_quantity_adjustment : variantDetails.quantity
		};
		shopify.productVariant.update(params.id,params)
      		.then(data => resolve(data), err => reject(err));
    });
}

var draftOrder = function(orderDetails) {
	return new Promise(function(resolve, reject) {
		var order = {
			"line_items": [
			{
				"variant_id": orderDetails.variantId,
				"quantity": orderDetails.quantity,
				"discount" : orderDetails.discount
			}]
		};
		shopify.draftOrder.create(order)
      		.then(data => resolve(data), err => reject(err));
    });
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
exports.addInventory = addInventory;
exports.draftOrder = draftOrder;
exports.pullCollection = pullCollection;
exports.getProducts = getProducts;
exports.clearCollection = clearCollection;
exports.authUrl = auth_url;