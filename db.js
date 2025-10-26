import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose'

dotenv.config()
const connectionString = process.env.CONNECTION_STRING;

const connectToDb = async () => {
    try {
        const db_connection = await mongoose.connect(connectionString)
        console.log(`HOST: ${db_connection.connection.host}\nDB NAME: ${db_connection.connection.name}`);
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        process.exit(1)

    }
}

export { connectToDb }