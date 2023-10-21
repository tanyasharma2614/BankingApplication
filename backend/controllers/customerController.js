const https = require('https');
const bcrypt = require('bcrypt');
const url = require('url');
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

    const parsed_url = url.parse(req.url, true);
    const zip_code = parsed_url.query.zip_code;
    const apiUrl = 'nominatim.openstreetmap.org';

    if(!zip_code){
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing zip code in the request body' }));
      return;
    }

    // Define additional query parameters if needed
    const query_params = new URLSearchParams({
      amenity: 'PNC Bank',
      format: 'json', // Response format (JSON)
      postalcode: zip_code.toString(),
    });

    // Creating the endpoint url for the third party provider
    const api_url_with_params = `/search?${query_params.toString()}`;

    // Setting up the request options
    const options = {
      hostname: apiUrl,
      path: api_url_with_params,
      method: 'GET',
      headers: {
        'User-Agent': 'Bank Application School Project',
      },
    };

    //Sending the request and waiting for the response
    const map_req = https.request(options, (map_res) => {
      let data = '';

      map_res.on('data', (chunk) => {
        data += chunk;
      });

      map_res.on('end', () => {
        //Sending this json data to the map
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    map_req.on('error', (error) => {
      console.error('Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    });

    map_req.end();
      
  }
};

module.exports = customerController;
