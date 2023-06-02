const createExpressMock = (body) => {
  const req = {
    body,
  };
  const res = {
    send: jest.fn(),
    json: jest.fn(),
  };

  return { req, res };
};

module.exports = { createExpressMock };
