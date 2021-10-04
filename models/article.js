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
  practice: String,
  email: String,
  state: String
});

const Article = mongoose.model('article',ArticleSchema);
module.exports = Article;
