import {mongoose} from "mongoose";
import mailSender from "../utils/mailSender";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5 // The document will be automatically deleted after 5 minutes of its creation time
    },
});

//Defino la funcion para enviar emails
async function sendOtpEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Noabank password temporal",
            `<h2>One Time Password para acceder a su cuenta de NoaBank</h2>
            <h3>Aquí está su código a utilizar como password temporal: </h3><h1>${otp}</h1>`
        );
        // console.log("Email enviado exitosamente", mailResponse);
    } catch (err) {
        console.log("Error al enviar el mail: ", err);
    }
}

otpSchema.pre("save", async function (next) {
    console.log("Nuevo documento guardado en la DB");
    if(this.isNew) {
        await sendOtpEmail(this.email, this.otp);
        console.log("Mail enviado con password temporal 📨🔑");
    }
    next();
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
