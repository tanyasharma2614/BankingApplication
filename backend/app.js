const http = require('http');
const fs = require('fs');
const handleAPIRequest = require('./routes/api');
const { url } = require('inspector');
const path = require('path'); 
require('dotenv').config();


const port = process.env.PORT || 8080;

const fileExtensions = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
};

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
    const urlArray = req.url.split('/');
    const fileName = urlArray[urlArray.length - 1];
    const fileExtension = path.extname(fileName);
    const filePath = getFilePath(fileName);

    if (filePath) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
          const contentType = fileExtensions[fileExtension] || 'text/plain';
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
});

const getFilePath = (fileName) => {
  const filePaths = {
    // Add file paths here 
    'main.css': '../frontend/src/styles/main.css',
    'sign-up.html': '../frontend/public/sign-up.html',
    'login.html':'../frontend/public/login.html',
    'locate_branch.html': '../frontend/public/locate_branch.html',
    'locate_branch.css': '../frontend/src/styles/locate_branch.css',
    'sign-up.js': '../frontend/src/components/sign-up.js',
    'login.js':'../frontend/src/components/login.js',
    'locate_branch.js': '../frontend/src/components/locate_branch.js',
    'sign-up.css': '../frontend/src/styles/sign-up.css',
    'business_policies.html' : '../frontend/public/business_policies.html',
    'business_policies.js' : '../frontend/src/components/business_policies.js',
    'business_policies.css' : '../frontend/src/styles/business_policies.css',
    'policy_rates.html' : '../frontend/public/policy_rates.html',
    'policy_rates.js' : '../frontend/src/components/policy_rates.js',
    'policy_rates.css' : '../frontend/src/styles/policy_rates.css',
    'admin_business_policies.html' : '../frontend/public/admin_business_policies.html',
    'admin_business_policies.js' : '../frontend/src/components/admin_business_policies.js',
    'admin_business_policies.css' : '../frontend/src/styles/admin_business_policies.css'
  };
  return filePaths[fileName] ? path.join(__dirname, filePaths[fileName]) : null;
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});