var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Variant = new Schema({
	id : Number,
    product_id : Number,
    title : String,
    price : Number,
    sku : String,
    position : Number,
    grams : Number,
    inventory_policy : String,
    compare_at_price : Number,
    fulfillment_service : String,
    inventory_management : String,
    option1 : String,
    option2 : String,
    option3 : String,
    created_at : Date,
    updated_at : Date,
    taxable : Boolean,
    barcode : String,
    image_id : Number,
    inventory_quantity : Number,
    weight : Number,
    weight_unit : String,
    old_inventory_quantity : Number,
    requires_shipping : Boolean
});

exports = Variant;