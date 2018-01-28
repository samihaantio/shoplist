const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line

const Item = new Schema({
  name: String,
  date: String,
});

module.exports = mongoose.model('Item', Item);
