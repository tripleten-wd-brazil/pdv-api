const express = require("express");
const app = express();
const port = 3000;

app.get("/users", (req, res) => {
  getProductsFromDatabase().then((products) => {
    res.json(products);
  });
});

app.get("/cards", (req, res) => {
  getProductsFromDatabase().then((products) => {
    res.json(products);
  });
});

app.get("/users/:id/cards/:cardId", (req, res) => {
  const { id, cardId } = req.params;

  getProductsFromDatabase().then((products) => {
    res.json(products);
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
