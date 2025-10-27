import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler.js';
import { usersRouter } from './routes/usersRoute.js';

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(helmet());
app.use(compression());
app.use(cors()) // not needed in production

app.get('/v1/status', (req, res) => {
    res.status(200).json({ message: "API is Running" })
})

app.use("/v1/users", usersRouter)


app.all("/*splat", (req, res) => {
    res.status(404).json({ message: `Route with ${req.url} Not Found` })
})

app.use(errorHandler)
app.listen(port, () => {
    console.log(`API Running on port: ${port}`);

})