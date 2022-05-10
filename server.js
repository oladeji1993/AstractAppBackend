require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const url = process.env.DATABASE_URL


mongoose.connect(url, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database"))


app.use(express.json())

const complaints = require('./routes/complaint')
const users = require('./routes/user')
app.use('/complaint', complaints)
app.use('/user', users)

app.listen(5000, () => console.log('listening on port'))