import { connectToDb } from "../db.js"
import { userModel } from "../model/Users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const userLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body
    try {
        await connectToDb();
        const checkLogin = await userModel.findOne({ email: userEmail });
        if (checkLogin) {
            const comparePassword = bcrypt.compare(userPassword, checkLogin.password)
            if (comparePassword) { }

        } else {
            res.status(404).json({ success: false, message: "User not found" })

        }

    } catch (error) {
        throw error;

    };
}