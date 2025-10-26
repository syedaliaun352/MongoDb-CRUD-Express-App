import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors'

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(helmet());
app.use(compression());
app.use(cors()) // not needed in production

app.get('/v1/status', (req, res) => {
    res.status(200).json({ Message: "API is Running" })
})


app.all("/*splat", (req, res) => {
    res.status(404).json({ Message: `Route with ${req.url} Not Found` })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`API Running on port: ${port}`);

})