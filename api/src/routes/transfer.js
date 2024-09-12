import express from "express"
import { transferSave, searchUser } from "../controllers/transferController.js";
const router = express.Router()

//Guarda una transferencia
router.post('/savetransfer', transferSave);

//Busca usuario por iban
router.post('/search', searchUser);

export default router