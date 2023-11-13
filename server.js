import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { loginController, registerController, validateController } from './controller/authController.js';


dotenv.config();

await connectDB();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    return res.send("Success");
});
app.post('/api/register', registerController);
app.post('/api/login', loginController);
app.post('/api/validate', validateController)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})