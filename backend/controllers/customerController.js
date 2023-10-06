const Customer = require('../models/customer');

const customerController = {
  login: function (req, res) {
    const username = req.headers.username;
    const password = req.headers.password;

    if (!username || !password) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing username or password in headers' }));
      return;
    }

    Customer.validateLogin(username, password, (error, results) => {
      if (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        if (results.length === 1) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
      }
    });
  },
  // Add more controller methods for other customer-related APIs here
  sign_up: function(req, res){
    const cust_id = req.headers.customer_id;
    const username = req.headers.username;
    const password = req.headers.password;

    if (!cust_id || !username || !password) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing customer id, username or password in headers' }));
      return;
    }
    
    Customer.signup(cust_id, username, password, (error, results) => {
      if(error){
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
      else{
        console.log("1 record inserted via Sign-up");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      }
    });
    
  }
};

module.exports = customerController;
