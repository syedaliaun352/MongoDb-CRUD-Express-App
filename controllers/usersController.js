import { userModel } from '../model/Users.js';
import { connectToDb } from '../db.js';
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
    try {
        await connectToDb();
        const getUsersList = await userModel.find({}, { password: 0 }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            users: getUsersList,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createUsers = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        await connectToDb();

        const existingUser = await userModel.findOne({ email: userEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use",
            });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const newUser = await userModel.create({
            username: userName,
            email: userEmail,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUsers = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        await connectToDb();

        let hashedPassword;
        if (userPassword) {
            hashedPassword = await bcrypt.hash(userPassword, 10);
        }

        const updateUser = await userModel.findOneAndUpdate(
            { email: userEmail },
            {
                username: userName,
                email: userEmail,
                ...(hashedPassword && { password: hashedPassword }),
                updatedAt: Date.now(),
            },
            { new: true }
        );

        if (updateUser) {
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: {
                    id: updateUser._id,
                    username: updateUser.username,
                    email: updateUser.email,
                    updatedAt: updateUser.updatedAt,
                },
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        throw error;
    }
};

const deleteUsers = async (req, res) => {
    const { id } = req.body;
    try {
        await connectToDb();
        const deleteUser = await userModel.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            id: deleteUser._id,
        });
    } catch (error) {
        throw error;
    }
};

export { getUsers, createUsers, updateUsers, deleteUsers };
