const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const routers = require('./routers/index');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;


app.use('/assets', express.static(__dirname + '/public'));
app.use(webpackMiddleware(compiler));

app.use(bodyParser.urlencoded({extended: true , limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/', routers);
app.listen(port, function(){
  console.log('server listen on port :' + port);
});
