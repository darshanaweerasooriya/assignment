const mongoose = require('mongoose');
const { report } = require('./route');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weatherData: [{
    date: { type: Date, default: Date.now },
    weather: String
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = { report };
