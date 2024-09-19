import express from "express"
import { adminUpdateUser} from "../controllers/adminController.js";
const router = express.Router()

//Devuelve datos basicos del admin
// router.get('/home', adminHome);

//Busca datos varios
// router.post('/search', adminSearch);

//Actualiza datos de un usuario
router.patch('/updateuser', adminUpdateUser);

export default router