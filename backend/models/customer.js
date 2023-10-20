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
    bankStatement: function(customer_id, callback){
        //Note: Need to have the Customer with the current customer_id in the Customer table before this
        const sql=` SELECT * FROM Transactions
                    WHERE Customer_Id = ${customer_id}
                    AND Timestamp_Start >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
                    ORDER BY Timestamp_Start DESC;`;
        db.query(sql, callback); 
    },
};

module.exports=Customer;
