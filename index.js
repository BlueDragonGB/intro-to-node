var http = require('http');
var url = require('url');
var fs = require('fs');
const PORT = process.env.PORT || 5000;

http.createServer(function(req, res){
  var q = url.parse(req.url, true);
  console.log(q.pathname);
  var fileName = '.'+ q.pathname;
  if(fileName=='./'){fileName = './main'}

  if(fileName.includes('.html')==false){
    fileName = fileName +'.html';
  }
  fs.readFile(fileName, function (err, data){
    if(err){
      res.writeHead(404,{'Content-Type': 'text/html'});
      return res.end('404 not found')
    }
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(data);
    console.log('...incoming request'+ req.url);
    res.end();
  })
}).listen(PORT);

console.log('server listening on '+ PORT);
