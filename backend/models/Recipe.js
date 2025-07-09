const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const recipeSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  ingredients:  { type: [String], required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true, min: 2 },
  imageUrl:     { type: String },
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

recipeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Recipe', recipeSchema);
