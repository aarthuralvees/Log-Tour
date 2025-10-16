import express from 'express';
import router from './routes/index.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000, () => {
    console.log('server running at  http://localhost:3000')
})