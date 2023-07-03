// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(500).send('Oops, something went wrong!!!');
};
