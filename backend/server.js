require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

connectDB();

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on ${process.env.PORT}`);
});
