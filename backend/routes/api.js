const customerController = require('../controllers/customerController');
const alertController=require('../controllers/alertController');
const adminController=require('../controllers/adminController');
const reportCardController=require('../controllers/reportCardController');
const productController=require('../controllers/productController');
const { parse } = require('querystring');

const jwt = require('jsonwebtoken');;

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
      case 'confirmReportCard':
          reportCardController.confirmReportCard(req,res);
          break;
      case 'deleteCard':
          reportCardController.deleteCard(req,res);
          break;
      case 'reactivateCard':
          reportCardController.reactivateCard(req,res);
          break;
      case 'addProduct':
          productController.addProduct(req,res);
          break;
      case 'updateProduct':
          productController.updateProduct(req,res);
          break;
      case 'deleteProduct':
          productController.deleteProduct(req,res);
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
      case 'report-card':
        reportCardController.reportCard(req,res);
        break;
      case 'fetch-product-details':
        productController.fetchProductDetails(req,res);
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