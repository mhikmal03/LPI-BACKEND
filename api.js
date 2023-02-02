const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(express.static('public')); 
app.use('/images', express.static('images'));


const port = process.env.PORT || 4500;

const appRouting = require('./api/app');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', appRouting);

app.listen(port, () => {
    console.log(`app run at port ${port}`);
});