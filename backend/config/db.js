const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tienda', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectarse a MongoDB:', err);
  }
};

module.exports = connectDB;
