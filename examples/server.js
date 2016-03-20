var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer( { dest: 'uploads/' });
var rewrite = require('express-urlrewrite');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./webpack.config');

var app = express();

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}));

var fs = require('fs');
var path = require('path');

fs.readdirSync(__dirname).forEach(function(file) {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

app.use(express.static(__dirname));

app.post('/', bodyParser.text({ type: "*/*"}), function(req, res) {
  // Echo back whatever was sent
  res.status(200).send(req.body);
});
app.post('/upload', upload.single('file'), function(req, res, next) {
  //console.log(req.file);
  res.header('Content-Type', 'text/plain');
  res.status(200).send(req.file.originalname);
})

app.listen(8080, function() {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop');
});
