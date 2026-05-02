const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const uiRoutes = require('./Routes.js/uiRoutes');
const adminRoutes = require('./Routes.js/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/ui', uiRoutes);       
app.use('/api/admin', adminRoutes);

const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});