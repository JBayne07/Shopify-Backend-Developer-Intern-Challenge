const express = require('express');
const mongoose = require('mongoose')
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
require('dotenv').config();
port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DB, (err) => {
    if(err) throw err;
    console.log('Database Connected');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port)
});