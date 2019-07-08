let express = require("express");

let routes = express.Router();

routes.get("/person", (req, res) => {
  if (req.query.name) {
    res.send(`You have requested a person ${req.query.name}`);
  } else {
    res.send("You have requested a person");
  }
});

routes.get("/person/:name", (req, res) => {
  res.send(`You have requested a person ${req.params.name}`);
});
routes.get("/error", (req, res) => {
  throw new Error("this is a forced error");
});

module.exports = routes;
