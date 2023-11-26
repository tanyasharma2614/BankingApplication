const bcrypt = require('bcrypt');

const Customer = require('../models/customer');
const {send_map_request} = require('./locate_branch_controller');

const customerController = {
  login: function (req, res)  {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        // Parse the request data
        const requestData = JSON.parse(body);
        const username = requestData['u-name'];
        const password = requestData['user-password'];

        if (!username || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing username or password in request data' }));
        } else {
            Customer.validateLogin(username, password, (error, results) => {
                if (error) {
                    console.error(error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                    if (results.length === 1) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ customer_id: results[0].Customer_Id }));
                    } else {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Unauthorized' }));
                    }
                }
            });
        }
    });
},
  sign_up: function(req, res){
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
        console.log(`Data received on backend: ${body}`)
        // Expected data from frontend
        // {
        //   'c-id': 'Aperiam libero volup',
        //   'u-name': 'Kaitlin Mcintosh',
        //   'user-password': 'Pa$$w0rd!',
        //   'user-password-confirm': 'Pa$$w0rd!'
        // }
        const requestData = JSON.parse(body);
        const cust_id = parseInt(requestData['c-id']);
        const username = requestData['u-name'];
        const password = await bcrypt.hash(requestData['user-password'], 10); // 10 is the number of salt rounds

        console.log(`${cust_id}, ${username}, ${password}`)
    
        if (!cust_id || !username || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing customer id, username or password in headers' }));
        }else{

          Customer.signup(cust_id, username, password, (error, results) => {
            if(error){
              console.error(error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            else{
              console.log("1 record inserted via Sign-up");
              res.writeHead(200, { 'Content-Type': 'application/json' });
              const responseData = {
                success: true,
                message: 'Data Received Successfully',
                data: {},
              };
              res.end(JSON.stringify(responseData));
            }
          });
          
        }
        
        
    });
    

   
  },
  accountActivity: function(req, res){
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
        console.log(`Data received on backend: ${body}`)
        // Expected data from frontend
        // {
        //   'c-id': 'Aperiam libero volup',
        //   'u-name': 'Kaitlin Mcintosh',
        //   'user-password': 'Pa$$w0rd!',
        //   'user-password-confirm': 'Pa$$w0rd!'
        // }
        const requestData = JSON.parse(body);
        const cust_id = parseInt(requestData['c-id']);

        // console.log(`${cust_id}`)
    
        if (!cust_id) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing customer id, username or password in headers' }));
        }else{

          Customer.accountActivity(cust_id, (error, results) => {
            if(error){
              console.error(error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
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
        
        
    });
    

   
  },
  // A function to submit a payment for a credit card account
  credit_card_payment: function(req, res){

    let body = '';
    
    req.on('data', chunk => {
      body += chunk;
    });
    
    req.on('end', () => {
        console.log(`Data received on backend: ${body}`)

        // The following is expected in the request
        // 1 - Customer ID
        // 2 - Account Number From
        // 3 - Account Number To
        // 4 - Transaction Amount

        const request_data = JSON.parse(body);

        try{

          const customer_id = parseInt(request_data['customer_id']);
          const account_num_from = parseInt(request_data['account_num_from']);
          const account_num_to = parseInt(request_data['account_num_to']);
          const transaction_amount = parseFloat(request_data['transaction_amount']);

          Customer.credit_card_payment(customer_id, account_num_from, account_num_to, transaction_amount, (error, results) => {
            
            if(error){
              console.error(error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            else{
              console.log(`Result of credit card payment request: ${JSON.stringify(results)}`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              
              const response_data = {
                success: true,
                message: 'Payment submitted Successfully'
              };

              res.end(JSON.stringify(response_data));
            }
          });
        }
        catch(error){
          console.log(error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing parameters needed to submit payment' }));
        }
        
        
        
    });
  },
  bankStatement: function(req, res){
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
        console.log(`Data received on backend: ${body}`)
        // Expected data from frontend
        // {
        //   'c-id': 'Aperiam libero volup',
        //   'u-name': 'Kaitlin Mcintosh',
        //   'user-password': 'Pa$$w0rd!',
        //   'user-password-confirm': 'Pa$$w0rd!'
        // }
        const requestData = JSON.parse(body);
        const cust_id = parseInt(requestData['c-id']);

        // console.log(`${cust_id}`)
    
        if (!cust_id) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing customer id, username or password in headers' }));
        }else{

          Customer.bankStatement(cust_id, (error, results) => {
            if(error){
              console.error(error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            else{
              console.log(`Result of get query: ${JSON.stringify(results)}`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              const responseData = {
                success: true,
                message: 'Data Received Successfully',
                data: results,
              };
              res.end(JSON.stringify(responseData));
            }
          });
          
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

module.exports = customerController;