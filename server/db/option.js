var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Option = new Schema({
    id: Number,
    product_id: Number,
    name: String,
    position: Number,
    values : Array
  });

exports = Option;