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
};

module.exports = customerController;
