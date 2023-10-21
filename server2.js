// Importa las bibliotecas necesarias
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');


// Crea una instancia de Express
const app = express();
const port = process.env.PORT || 3000; // Puedes configurar el puerto que desees
const webpackConfig = require('./webpack/dev.config.js');

// Define rutas estáticas para los archivos generados por Webpack
app.use(express.static(path.join(__dirname, '/dist/')));

//Middleware
const prodConfig = require('./webpack/dev.config');

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.path,
}));

// Ruta de inicio: sirve la página HTML de tu aplicación React
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
*/

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});