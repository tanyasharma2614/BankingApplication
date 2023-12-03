const db=require('../config/database');

const Customer={

    validateLogin: function(username, password, callback){
        const sql='SELECT * FROM Credentials WHERE username=? AND password=?';
        db.query(sql,[username,password],callback);
    },

    validateGoogleLogin:function(email,callback){
        const sql='SELECT * FROM Customer WHERE email=?';
        db.query(sql,[email],callback);
    },

    signup: function(customer_id, username, password, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql="INSERT INTO Credentials (Customer_Id, User_Type, Username, Password) VALUES (" + customer_id + ", 'customer', '" + username + "', '" + password + "')";
        db.query(sql, callback); 
    },
    accountActivity: function(customer_id, callback){

        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    ORDER BY Timestamp_Start DESC
                    LIMIT 10;`;

        db.query(sql, (error, results) => {
            
            if(error){
                callback(error, results);
            }

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
    bankStatement: function(customer_id, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    AND Timestamp_Start >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
                    ORDER BY Timestamp_Start DESC;`;
        db.query(sql, callback); 
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
    }
};

module.exports=Customer;