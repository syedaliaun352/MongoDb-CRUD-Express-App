import { userModel } from '../model/Users.js'
import { connectToDb } from '../db.js'
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
    try {
        await connectToDb()
        const getUsersList = await userModel.find({}, { userPassword: 0 }).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            users: getUsersList
        })

    } catch (error) {
        console.log(error);
        throw error
    }
}

const createUsers = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body
    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            success: false,
            message: "all fields are reqiured"
        })
    }
    try {
        await connectToDb();
        const existingUser = await userModel.findOne({ userEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use"
            });
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const newUser = await userModel.create({
            username: userName,
            email: userEmail,
            password: hashedPassword
        })
        if (newUser) {
            return res.status(201).json({
                success: true,
                message: "User Created",
                data: {
                    userName: newUser.userName,
                    userEmail: newUser.userEmail,
                }
            })
        }

    } catch (error) {
        console.log(error);
        throw error
    }
}

const updateUsers = (req, res) => { }

const deleteUsers = (req, res) => { }

export { getUsers, createUsers, updateUsers, deleteUsers }