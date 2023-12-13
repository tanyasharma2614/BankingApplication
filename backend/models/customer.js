const db=require('../config/database');
const bcrypt = require('bcrypt');

const Customer={

    validateLogin: function(username, password, callback){
        const sql='SELECT * FROM Credentials WHERE username=?';
        db.query(sql,[username],(err,results)=>{
            if(err){
                return callback(err,null);
            }
            if(results.length===0){
                return callback(null,false,{message:'Username not found'});
            }
            const storedHashedPassword=results[0].Password;
            bcrypt.compare(password,storedHashedPassword,(bcryptErr,isMatch)=>{
                if(bcryptErr){
                    return callback(bcryptErr,null);
                }
                if(isMatch){
                    return callback(null,true,{message:'Login successful',user:results[0]});
                }else{
                    return callback(null,false,{message:'Incorrect password'});
                }
            });
        });
    },

    validateGoogleLogin:function(email,callback){
        const sql='SELECT * FROM Customer WHERE email=?';
        db.query(sql,[email],callback);
    },
    application: function(firstName, lastName, address, cellPhone, email, dateOfBirth, accountType, callback){
        sql="INSERT INTO Customer (First_Name, Last_Name, Address, Cell_Phone, Email, DOB) VALUES ('" + firstName + "','" + lastName + "', '" + address + "', '" + cellPhone + "', '" + email + "', '" + dateOfBirth +"')";
        db.query(sql, callback); 
        const checkEmailQuery = 'SELECT Customer_Id FROM Customer WHERE email = ?';
        db.query(checkEmailQuery, [email], (error, results) => {
            if (error) {
              // Handle the error
              callback(error);
            } else {
              if (results.length > 0) {
                // The email exists in the Customer table, so you can proceed with the update
                const Customer_Id = results[0].Customer_Id;
                const currDate = new Date().getDate;
                sql="INSERT INTO accounts (Date_Of_Creation, Customer_Id, Account_Balance, Account_Type) VALUES ('" + currDate + "','" + Customer_Id + "', '" + 0 + "', '" + accountType +"')";
                db.query(sql, callback);
              }
            }
          });
        const currDate = new Date().getDate;
        sql="INSERT INTO accounts (Date_Of_Creation, Customer_Id, Account_Balance, Account_Type) VALUES ('" + currDate + "','" + Customer_Id + "', '" + 0 + "', '" + accountType +"')";
        db.query(sql, callback);
     
    },
    changeCredentials: function(email, newPassword, callback){
        // First, check if the email exists in the Customer table
        const checkEmailQuery = 'SELECT Customer_Id FROM Customer WHERE email = ?';
        db.query(checkEmailQuery, [email], (error, results) => {
          if (error) {
            // Handle the error
            callback(error);
          } else {
            if (results.length > 0) {
              // The email exists in the Customer table, so you can proceed with the update
              const Customer_Id = results[0].Customer_Id;
              const updatePasswordQuery = 'UPDATE Credentials SET password = ? WHERE Customer_Id = ?';
              db.query(updatePasswordQuery, [newPassword, Customer_Id], (updateError) => {
                if (updateError) {
                  // Handle the update error
                  callback(updateError);
                } else {
                  // Password updated successfully
                  callback(null, 'Password updated');
                }
              });
            } else {
              // The email does not exist in the Customer table
              callback(null, 'Email not found');
            }
          }
        });
        
    },
    signup: function(customer_id, username, password, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql="INSERT INTO Credentials (Customer_Id, User_Type, Username, Password) VALUES (" + customer_id + ", 'Customer', '" + username + "', '" + password + "')";
        db.query(sql, callback); 
    },
    validateTeller: function(username, callback){
        const sql='SELECT * FROM Credentials WHERE username=?';
        db.query(sql,[username],(err,results)=>{
            if(err){
                return callback(err,null);
            }
            if(results.length===0){
                return callback(null,false,{message:'Username not found'});
            }
            return callback(null,true,{message:'Login successful',user:results[0]});
        });
    },
    accountActivity: function(customer_id, callback){

        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    ORDER BY Timestamp_Start DESC;`;

        db.query(sql, (error, results) => {
            
            if(error){
                callback(error, results);
            }

            const results_list = []
            // console.log(results.length)

            results_list.push(results);

            // Getting the accounts information
            const get_accounts = `SELECT * FROM Accounts WHERE Customer_Id =  ${customer_id};`;
                
            db.query(get_accounts, (error_new, results_new) => {

                results_list.push(results_new);
                callback(error_new, results_list);

            });

        }); 
    },
    bankStatement: function(customer_id, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    AND Timestamp_Start >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
                    ORDER BY Timestamp_Start DESC;`;

        db.query(sql,  (error, results) => {
            
            if(error){
                callback(error, results);
            }
            // console.log(results.length)

            const results_list = []

            results_list.push(results);

            // Getting the accounts information
            const get_accounts = `SELECT * FROM Accounts WHERE Customer_Id =  ${customer_id};`;
                
            db.query(get_accounts, (error_new, results_new) => {

                results_list.push(results_new);
                callback(error_new, results_list);

            });

        });

    },
    credit_card_payment: function(customer_id, account_num_from, account_num_to, transaction_amount, callback){
        //Note: Need to have the follwing before executing this:
        // 1 - Customer with the current customer_id in the Customer table
        // 2 - Account with account_number_to in the Accounts table

        const create_transaction = `INSERT INTO Transactions (Transaction_Type, Transaction_Amount, Customer_Id, Account_Num_From, Account_Num_To, Timestamp_Start, Timestamp_End) VALUES ("Credit", ${transaction_amount}, ${customer_id}, ${account_num_from}, ${account_num_to}, CURRENT_TIMESTAMP(), DATE_SUB(CURRENT_TIMESTAMP, INTERVAL -2 DAY));`;
        
        db.query(create_transaction, (error, results) => {

            if(error){
                callback(error, results);
            }

            //Reducing the payment amount from the from account
            const update_balance = `UPDATE Accounts SET Account_Balance = Account_Balance - ${transaction_amount} WHERE Account_Number=${account_num_from};`;
            
            db.query(update_balance, (error, results) => {
                
                if(error){
                    callback(error, results);
                }

                //Reducing the payment amount from the to account
                const make_payment = `UPDATE Accounts SET Account_Balance = Account_Balance - ${transaction_amount} WHERE Account_Number=${account_num_to};`;
                
                db.query(make_payment, callback);
            });
        });
        
    },
    handleRevokedAmountTo:function(account_num_to,amount,callback){
        const sql2 = `UPDATE Accounts
                            SET Account_Balance = Account_Balance - ${amount}
                            WHERE Account_Number=${account_num_to}`;
        db.query(sql2,callback)
    },

    handleRevokedAmountFrom:function(account_num_from,amount,callback){
        const sql1 = `UPDATE Accounts
                    SET Account_Balance = Account_Balance + ${amount}
                     WHERE Account_Number=${account_num_from}`;
        db.query(sql1,callback);
    },

    revokeTransaction:function(customer_id,
                               account_num_from,
                               account_num_to,
                               transaction_amount,
                               transaction_id,
                               callback){
        const sql = `DELETE FROM Transactions
                     WHERE Customer_Id=${customer_id}
                     AND Account_Num_From=${account_num_from}
                     AND Account_Num_To=${account_num_to}
                     AND Transaction_Amount=${transaction_amount}
                     AND Transaction_Id=${transaction_id}`;
        db.query(sql,callback);
    },

    findCustomerById: function(customer_id, callback) {
        const sql = `SELECT * FROM transactions
                     WHERE Customer_Id = ${customer_id}`;
        db.query(sql, callback);
    },

    fetchDebitCardDetails: function(customerId, callback) {
        const sql = `
            SELECT c.Card_id, c.Card_Number, c.Card_Status
            FROM accounts a
            JOIN cards c ON a.Account_Number = c.Account_Number
            WHERE a.Customer_Id = ?;
        `;
    
        // Execute the SQL query using your database connection, and call the callback with the results.
        db.query(sql, [customerId], callback);
    },
    
    
    getCardNumberByCardId: function(cardId, callback){
        // Note: Need to have the Card with the current cardId in the Cards table before this
        const sql = `SELECT Card_Number FROM Cards
                     WHERE Card_Id = ${cardId};`;
        db.query(sql, callback); 
    },

    getCardStatus: function(cardId, callback) {
        const sql = `SELECT Card_status FROM Cards WHERE Card_Id = ${cardId};`;
        db.query(sql, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            if (result.length) {
                return callback(null, result[0].Card_status);
            } else {
                return callback(new Error('Card not found'), null);
            }
        });
    },    

    updateCardStatus: function(cardId, newStatus, callback){
        // Note: Need to have the Card with the current cardId in the Cards table before this
        const sql = `UPDATE Cards
                     SET Card_status = ${newStatus}
                     WHERE Card_Id = ${cardId};`;
        db.query(sql, callback); 
    },
    
    getEmailByCardId: function(cardId, callback){
        const sql = `
            SELECT Customer.email
            FROM Cards
            JOIN Accounts ON Cards.account_number = Accounts.account_number
            JOIN Customer ON Accounts.customer_id = Customer.customer_id
            WHERE Cards.card_id = ${cardId};
        `;
        db.query(sql, callback);
    },

    getAllProducts: function(callback) {

        const sql = 'SELECT * FROM Products;';
        db.query(sql, callback);
    },
    getAccountNumbers: function(customer_id, callback) {
        const sql = `SELECT account_number FROM accounts WHERE Customer_Id = ${customer_id}`;
        db.query(sql, callback);
    },
    getODAccDetails: function(customer_id, callback) {
        const sql = `SELECT account_number, account_balance, overdraft FROM accounts WHERE Customer_Id = ${customer_id}`;
        db.query(sql, callback);
    },
    updateOverdraftStat: function(overdraft, accNumber, callback) {
        const sql = `UPDATE accounts SET overdraft = ? WHERE account_number = ?`;
        db.query(sql, [overdraft, accNumber], callback);
    }
};

module.exports=Customer;
