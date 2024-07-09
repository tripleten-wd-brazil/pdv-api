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
app.use(users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
