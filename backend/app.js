const http = require('http');
const fs = require('fs');
const handleAPIRequest = require('./routes/api');
const { url } = require('inspector');
const path = require('path'); 
require('dotenv').config();


const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = __dirname + '/../frontend/public/index.html';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/api')) {
    handleAPIRequest(req, res);

  } else if (req.url.indexOf('.js') != -1) {
    const urlArray = req.url.split("/") 
    let filePath;
    // console.log(urlArray)
    if(urlArray[urlArray.length - 1] === 'sign-up.js'){
      filePath = path.join(__dirname, '../frontend/src/components/sign-up.js');
      // console.log(filePath)
    }
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  }else if (req.url.indexOf('.css') != -1) {
    const urlArray = req.url.split("/") 
    let filePath;


    if(urlArray[urlArray.length - 1] == "sign-up.css"){
      filePath = path.join(__dirname, '../frontend/src/styles/sign-up.css');
      // console.log(filePath)
    }
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
