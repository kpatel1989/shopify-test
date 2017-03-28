var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Variant = require(global.SERVER_PATH + "/db/variant");
var Option = require(global.SERVER_PATH + "/db/option");
var Image = require(global.SERVER_PATH + "/db/image");

// create a schema
var Product = new Schema({
	id: Number,
	title: String,
	body_html: String,
	vendor: String,
	product_type: String,
	created_at: Date,
	handle: String,
	updated_at: Date,
	published_at: Date,
	template_suffix: String,
	published_scope: String,
	tags: String,
	variants: [Variant],
	options: [Option],
	images: [Image],
	image : Image	
});
exports = Product;