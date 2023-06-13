module.exports = function (app) {
  app.get("/users", (req, res) => {
    getProductsFromDatabase().then((products) => {
      res.json(products);
    });
  });
};
