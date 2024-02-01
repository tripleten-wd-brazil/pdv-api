const Product = require('../models/products');
const { deleteProduct } = require('./products');

describe('Products', () => {
  describe('deleteProduct', () => {
    it("should return 403 when product's user is different than req.user", () => {
      // arranje
      const product = {
        user: 'id1',
      };
      const req = {
        params: {
          id: 'id_produto',
        },
        user: {
          _id: 'id2',
        },
      };
      const res = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(Product, 'findById').mockResolvedValue(product);
      // act
      deleteProduct(req, res);
      // assert

      expect(res.status).toHaveBeenCalledWith(403);
    });
  });
});
