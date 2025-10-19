import express from 'express';
import router from './routes/index.js'
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000, () => {
    console.log('server running at  http://localhost:3000')
})