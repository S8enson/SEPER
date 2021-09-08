// models/Book.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  pubyear: {
    type: Number,
    required: true
  },
  doi: {
    type: String,
    required: true
  }
});

module.exports = Article = mongoose.model('article', ArticleSchema);