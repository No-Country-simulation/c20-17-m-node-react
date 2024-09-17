import { mongoose } from "mongoose";
import "dotenv/config";

export const dbConnect = () => {
    
mongoose
.connect(process.env.MONGODB_URI + process.env.APP_NAME)
.then(() =>
    console.log(`  MongoDB connected to \x1b[34m${process.env.APP_NAME}\x1b[0m database.
===========================================`)
)
// .catch(err=> console.log('MongoDB connection error: ', err))
.catch((err) =>
    console.log(
    `        \x1b[31mMongoDB connection error: \x1b[0m
===========================================
    `,
    err
    )
);
}