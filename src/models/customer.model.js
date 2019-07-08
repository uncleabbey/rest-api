let mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://uncleabbey:4xSyxQRgKdBHd46h@cluster0-zwhxz.gcp.mongodb.net/customer?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});
let CustomerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
