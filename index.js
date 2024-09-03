// index.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors())

app.get('/autos', (req, res) => {
    console.log("se entro a la ruta /autos")

  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer el archivo de autos.' });
    }


    const autos = JSON.parse(data);


    res.json(autos);
  });
});


app.get('/filtrar-autos', (req, res) => {
    console.log("se entro a la ruta /filtrar-autos")
  const { marca, modelo, ano } = req.query;


  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer el archivo de autos.' });
    }


    const autos = JSON.parse(data);


    let autosFiltrados = autos;

    if (marca) {
      autosFiltrados = autosFiltrados.filter(auto => auto.brand.toLowerCase() === marca.toLowerCase());
    }
    if (modelo) {
      autosFiltrados = autosFiltrados.filter(auto => auto.model.toLowerCase() === modelo.toLowerCase());
    }
    if (ano) {
      autosFiltrados = autosFiltrados.filter(auto => auto.year === año);
    }

    if (autosFiltrados.length === 0) {
      return res.status(404).json({ message: 'No se encontraron autos con esas características.' });
    }


    res.json(autosFiltrados);
  });
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});