const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUploadPath: String
});

module.exports = mongoose.model('Item', ItemSchema, 'Items');