// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const authRoutes = require('./routes/authRoutes'); 

// const app = express();
// const PORT = 5000;

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// app.use('/api', productRoutes);
// app.use('/api', cartRoutes);
// app.use('/api', authRoutes); 

// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Ruta no encontrada' });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Error interno del servidor' });
// });

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000; 

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', authRoutes); 

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en https://videojuegos-7gih.onrender.com`);
});
