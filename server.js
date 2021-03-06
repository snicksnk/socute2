var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))


app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});


app.get("/stylesheets/stylesheet.css", function(req, res) {
  res.sendFile(__dirname + '/stylesheets/stylesheet.css')
});


app.get("/stylesheets/github-light.css", function(req, res) {
  res.sendFile(__dirname + '/stylesheets/github-light.css')
});


app.get("/stylesheets/print.css", function(req, res) {
  res.sendFile(__dirname + '/stylesheets/print.css ')
});

app.get("/node_modules/bootstrap/dist/js/bootstrap.js", function(req, res) {
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.js')
});

app.get("/node_modules/bootstrap/dist/css/bootstrap.css", function(req, res) {
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css')
});


app.get("/images/icons/png/:icon", function(req, res) {
  res.sendFile(__dirname + '/images/icons/png/' + req.params.icon)
});








app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
