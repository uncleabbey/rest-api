let express = require("express");

let personRoute = require("./routes/person");
let customerRoute = require("./routes/customer");
let path = require("path");
let bodyParser = require("body-parser");
let cors = require("cors");
require('dotenv').config()


let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});
app.use(personRoute);
app.use(customerRoute);
app.use(express.static("public"));

// Handler for error 404 Resources not found
app.use((req, res, next) => {
  res.status(404).send("We think you are lost");
});
// Handler for error 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "../public/500.html"));
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`server has started on localhost:${PORT}`));
