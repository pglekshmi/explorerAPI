import express from 'express';
import dotenv from 'dotenv';
import gethRoute from './Routes/apiRoute.js';

dotenv.config();



const app = express();

app.use('/',gethRoute);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is listening to ${PORT}`);
    
})

