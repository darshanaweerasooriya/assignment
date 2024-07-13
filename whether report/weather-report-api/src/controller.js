const { User } = require('./models');
const axios = require('axios');

const storeUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    const user = new User({ email, location });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUserLocation = async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserWeatherData = async (req, res) => {
  const { email } = req.params;
  const { date } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send();
    }
    const weatherData = user.weatherData.filter(data => data.date.toISOString().split('T')[0] === date);
    res.send(weatherData);
  } catch (error) {
    res.status(400).send(error);
  }
};

const fetchWeatherData = async (location) => {

  const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`);
  return response.data.current.condition.text;
};

const updateWeatherData = async () => {
  const users = await User.find();
  for (const user of users) {
    const weather = await fetchWeatherData(user.location);
    user.weatherData.push({ weather });
    await user.save();
  }
};

module.exports = { storeUser, updateUserLocation, getUserWeatherData, updateWeatherData };
