const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 100 },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 200 },
    { id: 3, name: 'Producto 3', description: 'Descripción 3', price: 300 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
