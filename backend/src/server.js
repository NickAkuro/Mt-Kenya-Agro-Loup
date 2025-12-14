const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const {connectDB} = require('./config/db');
const agroRoutes = require('./routes/agro');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

connectDB();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('MT Kenya Agro API is running');
});
app.use('/api/agro', agroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});