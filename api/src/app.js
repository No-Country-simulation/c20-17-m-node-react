import { mongoose } from "mongoose"
import express from "express";
import 'dotenv/config'

const port = process.env.PORT
const app = express() 

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log(`MongoDB connected to ${process.env.APP_NAME} database.`))
    .catch(err=> console.log('MongoDB connection error: ', err))


app.use('/', (req, res) => {
    res.send('hello')

})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})