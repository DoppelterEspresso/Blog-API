var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
