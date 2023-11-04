const https = require('https');
const Customer = require('../models/customer');

function initiateTransactionRevocationTo(account_to, transaction_amount,res){
  Customer.handleRevokedAmountTo(account_to,transaction_amount,(error, results) => {
    if (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    } else {
      console.log(`Result of get query: ${JSON.stringify(results)}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const responseData = {
        success: true,
        message: 'Data Revoked Successfully',
        data: results,
      };
      res.end(JSON.stringify(responseData));
    }
  });
}

function initiateTransactionRevocationFrom(account_from, account_to, transaction_amount,res) {
  Customer.handleRevokedAmountFrom(account_from,transaction_amount,(error, results) => {
      if (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        initiateTransactionRevocationTo(account_to, transaction_amount,res);
      }
  });
}

const transactionController={
  revoke(req,res){
    let body='';

    req.on('data', chunk => {
        body += chunk;
      });
    req.on('end', async () => {
        const requestData = JSON.parse(body);
        let customer_id=parseInt(requestData['customerId']);
        let transaction_id=parseInt(requestData['transactionID']);
        let transaction_amount=parseInt(requestData['transactionAmount']);
        let account_from=parseInt(requestData['accountFrom']);
        let account_to=parseInt(requestData['accountTo']);
        if (!customer_id) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing customer id, username or password in headers' }));
          }else{
            Customer.revokeTransaction(customer_id,
                                       account_from,
                                       account_to,
                                       transaction_amount,
                                       transaction_id,
                                       (error,results)=>{
                                        if(error){
                                            console.error(error);
                                            res.writeHead(500, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                        }
                                        else{
                                          initiateTransactionRevocationFrom(account_from,account_to,transaction_amount,res);
                                        }
                                       });
                            }

                        })
  }
}

module.exports= transactionController

