import { userModel } from '../model/Users.js'
import { connectToDb } from '../db.js'

const getUsers = async (req, res) => {
    try {
        await connectToDb()
        const getUsersList = await userModel.find()
        res.status(200).json({
            message: "success",
            users: getUsersList
        })

    } catch (error) {
        throw new Error(`ERROR: ${error.message || "Something Went Wrong"}`);
    }
}

const createUsers = (req, res) => { }

const updateUsers = (req, res) => { }

const deleteUsers = (req, res) => { }

export { getUsers, createUsers, updateUsers, deleteUsers }