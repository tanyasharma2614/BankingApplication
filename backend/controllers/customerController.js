const https = require('https');
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
    
  },
  //A function that uses nominatim geolocation API
  locate_branch: function(req, res){
    const zip_code = req.headers.zip_code;
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
        const response = JSON.parse(data);
        console.log(response);
      });
    });

    map_req.on('error', (error) => {
      console.error('Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    });

    map_req.end();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
      
  }
};

module.exports = customerController;
