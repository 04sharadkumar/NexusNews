// Correct CommonJS import
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String },
  isBreaking: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  author: { type: String, required: true },
  readTime: { type: String, required: true },
});

const Article = mongoose.model('Article', newsSchema);

module.exports = Article;
