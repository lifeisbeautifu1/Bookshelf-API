const express = require('express');
require('express-async-errors');

const books = require('./routes/books');
const user = require('./routes/user');

const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/authentication');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'welcome to home page!' });
});

app.use('/api/v1/books', auth, books);
app.use('/auth', user);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server runnig on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
