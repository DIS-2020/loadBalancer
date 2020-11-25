//step 1
var http = require("http");
// https://github.com/substack/seaport
var seaport = require("seaport");
var port = seaport.connect("localhost", 9090);
const path = require("path");
const fs = require("fs");

// Her skal der være noget funktionalitet
// step 2
function simulation(n) {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// step 3
//https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
// returns a net server: https://nodejs.org/api/net.html#net_class_net_server
var server = http.createServer(function (req, res) {
  //add headers?
  // note that this.address() is available because http.createServer
  // returns a net server.
  res.end("sum: " + simulation(100_000) + ", port: " + this.address().port);
});

// step 4
server.listen(port.register("server"), function () {
  console.log("server listening on port ", this.address().port);
});
