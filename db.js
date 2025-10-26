import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose'

dotenv.config()
const connectionString = process.env.CONNECTION_STRING;

const connectToDb = async () => {
    try {
        const connect = await mongoose.connect(connectionString)
        console.log(`HOST: ${connect.connection.host}\nDB NAME: ${connect.connection.name}`);
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        process.exit(1)

    }
}

export { connectToDb }