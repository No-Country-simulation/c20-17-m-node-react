import express from "express";
import authRouter from "./routes/auth.js";
import transferRouter from "./routes/transfer.js";
import utilsRouter from "./routes/utils.js";
import adminRouter from "./routes/admin.js";
import { dbConnect } from "./config/database.js";
import "dotenv/config";
import cors from "cors";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api", authRouter);
app.use('/transfer', transferRouter);
app.use('/admin' , adminRouter);

app.use('/utils', utilsRouter);

app.listen(port, () => {
  console.log(
    `
===========================================
       \x1b[32mServer running on port ${port}\x1b[0m         
===========================================`
  );
});
