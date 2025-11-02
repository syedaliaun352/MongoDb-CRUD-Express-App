import { connectToDb } from "../db.js";
import { userModel } from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        await connectToDb();

        const checkLogin = await userModel.findOne({ email: userEmail });
        if (!checkLogin) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const comparePassword = await bcrypt.compare(userPassword, checkLogin.password);
        if (!comparePassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: checkLogin._id },
            process.env.JWT_KEY,
            { expiresIn: "120m" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: checkLogin._id,
                username: checkLogin.username,
                email: checkLogin.email,
            },
        });

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { userLogin };
