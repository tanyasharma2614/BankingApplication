const db=require('../config/database');

const Customer={

    validateLogin: function(username, password, callback){
        const sql='SELECT * FROM Credentials WHERE username=? AND password=?';
        db.query(sql,[username,password],callback);
    },

    signup: function(customer_id, username, password, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql="INSERT INTO Credentials (Customer_Id, User_Type, Username, Password) VALUES (" + customer_id + ", 'Customer', '" + username + "', '" + password + "')";
        db.query(sql, callback); 
    },
    accountActivity: function(customer_id, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    ORDER BY Timestamp_Start DESC
                    LIMIT 10;`;
        db.query(sql, callback); 
    },
    bankStatement: function(customer_id, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    AND Timestamp_Start >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
                    ORDER BY Timestamp_Start DESC;`;
        db.query(sql, callback); 
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
    }
};

module.exports=Customer;