const customerController = require('../controllers/customerController');
const { parse } = require('querystring');

function handleAPIRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (req.method === 'POST') {
    const endpoint = pathname.split('/').pop();

    switch (endpoint) {
      case 'login':
        customerController.login(req, res);
        break;
      // Add more cases for other endpoints and controllers as needed
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        break;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

module.exports = handleAPIRequest;
