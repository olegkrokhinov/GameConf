const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tipe",
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
  },
  shape: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shape",
  },
  imageUploadPath: String,
});

module.exports = mongoose.model("Item", ItemSchema, "Items");
