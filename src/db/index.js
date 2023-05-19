const mongoose = require("mongoose");

module.exports = () => {
  const dbConnection = mongoose.connect(process.env.DB_CONNECTION);
  dbConnection
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Couldn't connect to DB:", err));
};
