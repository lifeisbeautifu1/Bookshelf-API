const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Please provide title for book'],
  },
  author: {
    type: String,
    required: [true, 'Please provide author for the book'],
  },
  thumbnail: {
    type: String,
    default:
      'https://media.istockphoto.com/vectors/01open-book-and-creative-paper-airplanes-teamwork-paper-art-style-vector-id1189849703?k=20&m=1189849703&s=612x612&w=0&h=ViTOSts22Be3PJY0HD_2dLSF31VE5BgD0Sm7ZB96DQ8=',
  },
  genre: {
    type: String,
    enum: ['Fantasy', 'Self-Development', 'Dystopian', 'Realist Novel', 'Romance Novel'],
    required: [true, "Please provide book's genre"],
  },
  price: {
      type: Number,
      required: [true, 'Please provide price for the book'],
  },
  description: {
      type: String,
      require: [true, 'Please provide description'],
  }
});

module.exports = mongoose.model('Book', BookSchema);
