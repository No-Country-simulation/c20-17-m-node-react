import { mongoose } from "mongoose"
import express from "express";
import 'dotenv/config'

const port = process.env.PORT
const app = express() 

mongoose.connect(process.env.MONGODB_URI+process.env.APP_NAME)
    .then(()=> console.log(`  MongoDB connected to \x1b[34m${process.env.APP_NAME}\x1b[0m database.
===========================================`))
    // .catch(err=> console.log('MongoDB connection error: ', err))
    .catch(err=> console.log(`        \x1b[31mMongoDB connection error: \x1b[0m
===========================================
    `, err))


app.use('/', (req, res) => {
    res.send(`<h1>${process.env.APP_NAME}</h1>`)

})

app.listen(port, ()=>{
    console.log(
`
===========================================
\x1b[42m       Server running on port ${port}         \x1b[0m
===========================================`);
})