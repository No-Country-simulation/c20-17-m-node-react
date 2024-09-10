import { mongoose } from "mongoose";
import express from "express";
import authRouter from "./routes/auth.js";
import transferRouter from "./routes/transfer.js";
import utilsRouter from "./routes/utils.js";
import "dotenv/config";
import cors from "cors";

const port = process.env.PORT;
const app = express();

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

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use('/transfer', transferRouter);

app.use('/utils', utilsRouter);

app.listen(port, () => {
  console.log(
    `
===========================================
       \x1b[32mServer running on port ${port}\x1b[0m         
===========================================`
  );
});
