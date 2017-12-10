/*
    Project Name: Patient Data Clinical Management
    Author: Yashkumar Sompura
    College ID: 300967186
    Subject: Node JS project
    keywords: RESTFull API development
*/

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');