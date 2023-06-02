const { faker } = require("@faker-js/faker");
const { createExpressMock } = require("../../utils/express-mock");
const { createProduct } = require("./controller");
const Product = require("./model");

describe("Product", () => {
  describe("POST /products", () => {
    it("should return a created product", async () => {
      const productData = {
        name: faker.word.noun(),
        price: faker.number.float(),
        imageUrl: faker.image.url(),
        category: faker.animal.type(),
      };
      const { req, res } = createExpressMock(productData);

      const spy = jest.spyOn(Product, "create");
      const createdProduct = { _id: "1", ...productData };
      spy.mockResolvedValue(createdProduct);

      await createProduct(req, res);
      expect(res.json).toHaveBeenCalledWith(createdProduct);
    });

    it("should send internal server error when something goes bad", async () => {
      const { req, res } = createExpressMock({});

      jest.spyOn(Product, "create").mockRejectedValue(new Error("Boom!"));

      await createProduct(req, res);
      expect(res.send).toHaveBeenCalledWith(expect.stringContaining("error"));
    });
  });
});
