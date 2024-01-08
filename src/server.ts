import express from 'express';
import router from './routes/Routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.use('/dashboard', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

mongoose.connect(process.env.MONGO_URL!)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));