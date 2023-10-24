const customerController = require('../controllers/customerController');
const alertController=require('../controllers/alertController');
const { parse } = require('querystring');

function handleAPIRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;
  const endpoint = pathname.split('/').pop();
  if (req.method === 'POST') {
    switch (endpoint) {
      case 'login':
        customerController.login(req, res);
        break;
      case 'signup':
        customerController.sign_up(req, res);
        break;
      case 'email-alert':
        alertController.alert(req,res);
        break;
      case 'locate_branch':
        customerController.locate_branch(req, res);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        break;
    }
  } else if (req.method === 'GET'){
    switch (endpoint) {
      case 'accountActivity':
        customerController.accountActivity(req, res);
      break;
        case 'bankStatement':
        customerController.bankStatement(req, res);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        break;
    }
  }else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

module.exports = handleAPIRequest;