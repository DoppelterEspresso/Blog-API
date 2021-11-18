var mongoose = require("mongoose");
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true },
}, { toJSON: { virtuals: true } });

PostSchema.virtual("date_format").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_FULL)
})

module.exports = mongoose.model("Post", PostSchema);
