import express from 'express';
import companyRoutes from './routes/companyRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectToMongo from './dbConfig.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = 5000;
const url = process.env.DB_URL;

connectToMongo(url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use('/api/companies', companyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));