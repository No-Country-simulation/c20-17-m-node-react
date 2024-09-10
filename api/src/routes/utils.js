import express from "express"
import { seedUserData } from "../controllers/utilController.js"
const router = express.Router()

//guarda fake data en el modelo user
router.post('/seedUser', seedUserData);

export default router