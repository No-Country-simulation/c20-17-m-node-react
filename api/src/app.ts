const  mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('base conect'))
const app = express() 

app.use('/', (req, res) => {
    res.send('hello')

})

app.listen(8080, ()=>{console.log('server8080')})