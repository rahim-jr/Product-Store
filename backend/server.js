import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

connectDB();

//console.log(process.env.MONGO_URI);
// Route, Request, Response and controller function

app.get('/products', (req, res) => {

});

app.get('/', (req, res) => {
    res.send("Server is ready");
});

app.listen(5000, () => {
    console.log("Server is running on port http://localhost:5000");
});

