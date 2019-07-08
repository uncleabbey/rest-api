let CustomerModel = require("../models/customer.model");
let express = require("express");

let router = express.Router();

//create a new customer POST
router.post("/customer", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  let model = new CustomerModel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      return res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// GET
router.get("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing a url parameter; email");
  }
  CustomerModel.findOne({
    email: req.query.email
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// UPDATE
router.put("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing a url parameter; email");
  }
  CustomerModel.findOneAndUpdate(
    {
      email: req.query.email
    },
    req.body,
    {
      new: true
    }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// DELETE
router.delete("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing a url parameter; email");
  }
  CustomerModel.findOneAndRemove({
    email: req.query.email
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// GET ALL CUSTOMERS
router.get("/customer/:all", (req, res) => {
  CustomerModel.find({}).sort({_id: -1})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
