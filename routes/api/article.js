const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../../models/article');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

//Get all
router.get('/', async (req, res) => {
    try {
      const article = await Article.find()
      res.json(article)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = router;
