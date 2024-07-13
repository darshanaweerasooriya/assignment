const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const routes = require('./routes');
const { updateWeatherData } = require('./controllers');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

mongoose.connect('mongodb+srv://darshanaweerasooriya11:darshana123@cluster0.q17sqrz.mongodb.net/weather_report_db retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

cron.schedule('0 */3 * * *', updateWeatherData);

app.listen(port, () => {
  console.log(`Server running on http://localhost:3001`);
});
