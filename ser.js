const http = require('http');
const https = require('https');
var json = [];

https.get('https://api.mcmakler.de/v1/advertisements', function (res) {
  res.on('data', function (data) {
    json += data.toString();
  });
});


http.createServer(function (req, res) {
})
  .listen(3000)
  .on('request', function (req, res) {
    if (req.url == '/') {
      res.write(json);
    }

    res.end();
  });