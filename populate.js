require('dotenv').config()
const Book = require('./models/Book')
const connectDB = require('./db/connectDB')
const booksJSON = require('./books.json');


const start = async () => {
    try {
        // console.log(process.env.MONGO_URI);
        await connectDB(process.env.MONGO_URI);
        await Book.deleteMany();
        await Book.create(booksJSON);
        console.log('Success!')
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
};

start();