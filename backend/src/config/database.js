const mongoose = require('mongoose');
const config = require('./config');

const connectDatabase = () => {
  mongoose.connect(
    config.mongoose.url, config.mongoose.options,
    function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log('database connected');
      return;
  }
  )
};

module.exports = connectDatabase;