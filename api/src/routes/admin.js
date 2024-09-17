import express from "express"
import { adminHome, adminSearch } from "../controllers/adminController.js";
const router = express.Router()

//Devuelve datos basicos del admin
router.get('/home', adminHome);

//Busca datos varios
router.post('/search', adminSearch);

export default router