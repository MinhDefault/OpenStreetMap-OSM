// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Configuration
const mongoURI = 'YOUR_MONGODB_URI_HERE';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model for the alerts
const alertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  message: { type: String, required: true },
});

const Alert = mongoose.model('Alert', alertSchema);

// Routes
app.post('/api/alerts', (req, res) => {
  const { type, latitude, longitude, message } = req.body;

  const newAlert = new Alert({
    type,
    latitude,
    longitude,
    message,
  });

  newAlert.save()
    .then(alert => res.json(alert))
    .catch(err => res.status(500).json({ error: 'Could not save the alert' }));
});

app.get('/api/alerts', (req, res) => {
  Alert.find({})
    .then(alerts => res.json(alerts))
    .catch(err => res.status(500).json({ error: 'Could not fetch alerts' }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
