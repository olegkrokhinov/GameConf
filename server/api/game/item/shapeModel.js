const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Shape", shapeSchema, "Shapes");