const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
//const proxy = require('http-proxy-middleware')

// module.exports = function(app) {
//     // add other server routes to path array
//     app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
// } 
// // routes
const articles = require('./routes/api/articles');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
const path = require("path");
// Step 1:
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

// use Routes
app.use('/api/articles', articles);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));


