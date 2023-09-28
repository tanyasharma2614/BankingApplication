const http = require('http');
const fs = require('fs');

// Define the port you want to use
const port = process.env.PORT || 8000;

// Create a server
const server = http.createServer((req, res) => {
  // If the request is for the root URL, serve the index.html file
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = __dirname + '/../frontend/public/index.html';
    
    // Read the HTML file and send it as a response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Handle other requests (e.g., CSS, JavaScript, images) as needed
    // You can add more routes and logic here
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
