import express from "express"
import { transferSave } from "../controllers/transferController.js";
const router = express.Router()

//Guarda una transferencia
router.post('/savetransfer', transferSave);


export default router