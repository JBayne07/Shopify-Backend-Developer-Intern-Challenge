const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DB, (err) => {
    if(err) throw err;
    console.log('Database Connected');
});

app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/shipmentRoutes'));

app.listen(process.env.PORT, () => {
    console.log('Listening on http://localhost:' + process.env.PORT)
});