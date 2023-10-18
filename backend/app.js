const http = require('http');
const fs = require('fs');
const handleAPIRequest = require('./routes/api');
const { url } = require('inspector');

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
  }
  // Handling requests for the CSS file
  else if (req.url === '/main.css') {
    const cssPath = __dirname + '/../frontend/src/styles/main.css';

    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  }
  // Handling requests for the locate branch functionality
  else if (req.url === '/locate_branch.html') {
    const cssPath = __dirname + '/../frontend/public/locate_branch.html';

    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
  else if (req.url.startsWith('/api')) {
    handleAPIRequest(req, res);
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});



server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
