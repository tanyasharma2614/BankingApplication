<<<<<<< Updated upstream
const https = require('https');
const url = require('url');
=======
const http = require('http');
const bcrypt = require('bcrypt');
>>>>>>> Stashed changes
const Customer = require('../models/customer');
const {send_map_request} = require('./locate_branch_controller');

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
<<<<<<< Updated upstream
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
=======
            Customer.validateLogin(username, password, (error, results) => {
                if (error) {
                    console.error(error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                    if (results.length === 1) {
                        
                        //Moving this to the customer dashboard callback
                        //res.writeHead(200, { 'Content-Type': 'application/json' });
                        //res.end(JSON.stringify({ success: true }));
                        
                        //Opening the customer dashboard for this user
                        open_customer_dashboard(results, res);
                    } else {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Unauthorized' }));
                    }
                }
            });
>>>>>>> Stashed changes
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
    
  },
  //A function that uses nominatim geolocation API
  locate_branch: function(req, res){

    let request_body = '';

    req.on('data', (chunk) => {
      request_body += chunk;
    });

    req.on('end', () => {
      send_map_request(request_body, res);
    });
          
  }
};

// A function to open the dashboard for the customer
function open_customer_dashboard(results, res){

  console.log(results[0].Customer_Id);
  
  Customer.accountsDashboard(results[0].Customer_Id, (error, results) => {
    if(error){
      console.error(error);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Failed to find the open accounts.');
    }
    else{
      console.log(`Result of get query: ${JSON.stringify(results)}`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      const responseData = {
        success: true,
        message: 'Data Received Successfully',
        data: {results},
      };
      res.end(JSON.stringify(responseData));
    }
  });

}

module.exports = customerController;
