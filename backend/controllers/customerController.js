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
                        res.end(JSON.stringify({ success: true }));
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