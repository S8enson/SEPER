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

// Get specific pratcice
router.get('/:practice', async (req, res) => {
    try {
      const wantedPractice = req.params.practice.replaceAll("&", " ")
      const wantedPractice2 = wantedPractice.replace(":", "")
      //res.status(500).json( {wantedPractice2} )
      const article = await Article.find({'practice': wantedPractice2}) //.select('title authors source pubyear doi claim evidence')
      res.json(article)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = router;
