const db=require('../config/database');

const Customer={

    validateLogin: function(username, password, callback){
        const sql='SELECT * FROM Credentials WHERE username=? AND password=?';
        db.query(sql,[username,password],callback);
    },
};

module.exports=Customer;