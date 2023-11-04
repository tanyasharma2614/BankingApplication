const customerController = require('../controllers/customerController');
const alertController=require('../controllers/alertController');
const adminController=require('../controllers/adminController');
const transactionController=require('../controllers/transaction_controller')
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
      case 'insertPolicy':
        adminController.insertPolicy(req,res);
        break;
      case 'insertPolicyRates':
        adminController.insertPolicyRates(req,res);
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
      case 'getAllPolicyNames':
        adminController.getAllPolicyNames(req,res);
        break;
      case 'getPolicyDesc':
        adminController.getPolicyDesc(req,res);
        break;
      case 'getAllPolicyRates':
        adminController.getAllPolicyRates(req,res);
        break;
      case 'google-login':
        customerController.google_login(req,res);
        break;
      case 'google-login-callback':
        customerController.google_login_callback(req,res);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        break;
    }
  }
  else if(req.method==='DELETE'){
    switch(endpoint){
      case 'trans-rev':
        transactionController.revoke(req,res);
        break;
      default:
        console.log('in delete')
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        break;
    }
  } else if (req.method==='PUT') {
    switch (endpoint) {
      case 'updatePolicy':
        adminController.updatePolicy(req, res);
        break;
      case 'updatePolicyRate':
        adminController.updatePolicyRate(req, res);
        break;
      default:
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Not Found'}));
        break;
    }
  } else if (req.method==='DELETE'){
    switch (endpoint) {
      case 'deletePolicy':
        adminController.deletePolicy(req,res);
        break;
      case 'deletePolicyRate':
        adminController.deletePolicyRate(req,res);
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