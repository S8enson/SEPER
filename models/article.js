const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  authors: String,
  source: String,
  pubyear: Number,
  doi: String,
  claim: String,
  evidence: String,
  practice: String
});

const Article = mongoose.model('article',ArticleSchema);
module.exports = Article;
