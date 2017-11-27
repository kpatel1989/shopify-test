var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Image= new Schema({
	id: Number,
	product_id: Number,
	position: Number,
	created_at: Date,
	updated_at: Date,
	src: String,
	variant_ids: Array
})


exports = Image;