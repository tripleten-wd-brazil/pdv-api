const { connect } = require('mongoose');

module.exports = () => {
  connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting on DB ', err));
};
