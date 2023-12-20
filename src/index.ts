import express from 'express';
import test from './routes/test';


const app = express();

app.use('/test', test);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
