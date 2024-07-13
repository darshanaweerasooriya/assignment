const express = require('express');
const router = express.Router();
const { storeUser, updateUserLocation, getUserWeatherData } = require('./controllers');

router.post('/users', storeUser);
router.put('/users/:email', updateUserLocation);
router.get('/users/:email/weather', getUserWeatherData);

module.exports = router;
