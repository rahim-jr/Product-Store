import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import ProductRoutes from './routes/product.route.js'   

dotenv.config();
const PORT = process.env.PORT || 5000 ;
const app = express();
app.use(express.json()) ;

// console.log(process.env.MONGO_URI);
// Route, Request, Response and controller function

app.use('/api/products' , ProductRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port http://localhost:5000");
});

