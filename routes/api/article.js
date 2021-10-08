const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../../models/article");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "seper.app.bot@gmail.com",
    pass: "seperapp1",
  },
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

//Get all accepted articles
router.get("/", async (req, res) => {
  try {
    const article = await Article.find({});
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submissions awaiting moderation
router.get("/moderation", async (req, res) => {
  try {
    const article = await Article.find({ state: "1" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/moderationaccept", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.body.id, {
      state: "2",
    });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/moderationdeny", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.body.id, {
      state: "4",
    });
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

// Submit Articles
router.post("/submit", async (req, res) => {
  const existingArticle = await Article.findOne({ doi: req.body.doi });
  if (existingArticle && existingArticle.state === "4") {
    res.status(400).json({ error: "Article has been previous denied" });
  } else {
    Article.create(req.body)
      .then((article) => {
        res.json({ msg: "Article submitted successfully" });
        const mailOptions = {
          from: "seper.app.bot@gmail.com",
          to: "qtn0334@autuni.ac.nz, dcm2548@autuni.ac.nz",
          subject: "You have new articles to moderate in SEPER!",
          text: "Someone has submitted an article to SEPER!",
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Moderator email sent: " + info.response);
          }
        });
      })
      .catch((err) =>
        res.status(400).json({ error: "Unable to submit this article" })
      );
  }
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
