// step 1
var http = require("http"),
  httpProxy = require("http-proxy"),
  seaport = require("seaport"),
  ports = seaport.connect("localhost", 9090),
  path = require("path"),
  fs = require("fs");

// Reference til step 4
var i = -1;

// step 2:
let proxy = httpProxy.createProxyServer({});

// step 3:
var server = http.createServer(function (req, res) {
  let addresses = ports.query("server");
  if (addresses.length == 0) res.end("No servers available");
  else {
    i = (i + 1) % addresses.length;
    var host = addresses[i].host.split(":").reverse()[0];
    var port = addresses[i].port;
    proxy.web(req, res, {
      target: "http://" + host + ":" + port
    });
  }
});

server.listen(8080, function () {
  console.log("load balancer listening on port ", this.address().port);
});
