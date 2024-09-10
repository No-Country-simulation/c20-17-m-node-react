import data from "../utils/data_user_mini.json" assert {type: "json"} //importante el assert
import User from "../models/user.js";

const seedUserData = async () => {

    //Seedea la DB con los datos del json creado con fake data
    //Funciona correctamente
    //SE EJECUTA UNA SOLA VEZ (por eso queda comentado)

    console.log("Para sedear la base de datos, descomente el codigo en testController.js");
    try {
        data.forEach((doc)=> {
            const myDoc = new User(doc);
            myDoc.save()
        })
        console.log("Usuarios insertados exitosamente");
    } catch (err) {
        console.log("Error al insertar los usuarios: ", err);
    }

}

export { seedUserData }