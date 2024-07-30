require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const users = require("./routes/users");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/pdv");
}

main()
  .then(() => console.log("DB running"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/health", (req, res) => {
  res.send("Ok!");
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "66847a295c9039b5f06d12bd",
  };
  next();
});
app.use(users);

app.use((err, req, res, next) => {
  console.log("middleware de error", err.name, err.message);
  res.status(err.statusCode || 500).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
