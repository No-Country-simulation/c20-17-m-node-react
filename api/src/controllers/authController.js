import User from "../models/user.js"
import  jwt  from "jsonwebtoken"
import 'dotenv/config'

//generateToken
export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

//registerUser
export const registerUser = async (req, res) => {
    const data = req.body

    try {
        const userExists = await User.findOne({email:data.email})

        if(userExists) {
            res.status(401).json({message: 'User already exists.'})
        }

        const user = await User.create(data)

        res.status(201).json({
            _id: user._id,
            username: user.first_name,
            token: generateToken(user._id)
        })
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }

}

//loginUser
export const loginUser = async (req, res) => {
    const user = req.body

    try {
        


    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//getMe
export const getMe = async (req, res) => {
    
}