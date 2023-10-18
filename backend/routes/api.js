const customerController = require('../controllers/customerController');
const { parse } = require('querystring');

function handleAPIRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (req.method === 'POST' || req.method === 'GET') {
    const endpoint = pathname.split('/').pop();

    switch (endpoint) {
      case 'login':
        customerController.login(req, res);
        break;
      // Add more cases for other endpoints and controllers as needed
      case 'signup':
        customerController.sign_up(req, res);
        break;
      case 'locate_branch':
        customerController.locate_branch(req, res);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        break;
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

module.exports = handleAPIRequest;
