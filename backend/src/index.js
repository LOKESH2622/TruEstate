const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const salesRoutes = require('./routes/salesRoutes');
const { loadData } = require('./utils/dataLoader');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const startServer = async () => {
  await loadData();
  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
};

startServer();
