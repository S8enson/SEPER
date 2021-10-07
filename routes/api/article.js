const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../../models/article");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

//Get all
router.get("/", async (req, res) => {
  try {
    const article = await Article.find({
      state: "3",
    });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific pratcice - search
router.get("/:practice", async (req, res) => {
  try {
    console.log("get practice");
    const wantedPractice = req.params.practice.replaceAll("&", " ");
    const wantedPractice2 = wantedPractice.replace(":", "");
    //res.status(500).json( {wantedPractice2} )
    const article = await Article.find({
      practice: wantedPractice2,
      state: "3",
    });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submissions awaiting moderation
router.get("/moderation", async (req, res) => {
  try {
    console.log("get moderation");
    const article = await Article.find({ state: "1" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submissions awaiting analysis
router.get("/analysis", async (req, res) => {
  try {
    const article = await Article.find({ state: "2" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit Articles
router.post("/submit", (req, res) => {
  console.log(req.body);
  Article.create(req.body)
    .then((article) => res.json({ msg: "Article submitted successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to submit this article" })
    );
});

// Update
router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// Delete
router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});

module.exports = router;
