const db=require('../config/database');

const admin={

    insertpolicy: function (policy_name, policy_desc, callback) {
        const sql = "INSERT INTO Business_Policies (Policy_Name, Policy_Desc) VALUES (?, ?)";
        db.query(sql, [policy_name, policy_desc], callback);
    },

    getpoliciesname: function(callback)
    {
        const sql = "SELECT Policy_Name FROM Business_Policies";
        db.query(sql, (error, results) => {
            if (error) {
                console.error('Error getting policy names:', error);
                callback(error, null);
            } else {
                callback(null, results);
            }
        });

    },

    getpolicydesc: function (policy_name, callback) {
        const sql = "SELECT Policy_Desc FROM Business_Policies WHERE Policy_Name = ?";
        db.query(sql, [policy_name], callback);
    },

    updatepolicy: function (policy_name, policy_desc, callback) {
        const sql = "UPDATE Business_Policies SET Policy_Desc = ? WHERE Policy_Name = ?";
        db.query(sql, [policy_desc, policy_name], callback);
    },

    insertpolicyrate: function(Policy_Name,rate,callback)
    {
        const sql = "INSERT INTO Policy_Rates (Policy_Name, rate) VALUES (?, ?)";
        db.query(sql, [Policy_Name, rate], callback);
    },
    updatepolicyvalue: function (Policy_Name,rate, callback) {
        const sql = "UPDATE Policy_Rates SET rate = ? WHERE Policy_Name = ?";
        db.query(sql, [rate, Policy_Name], callback);
    },
    getpoliciesrates: function(callback)
    {
        const sql = "SELECT Policy_Name, rate FROM Policy_Rates";
        db.query(sql, (error, results) => {
            if (error) {
                console.error('Error getting policy names:', error);
                callback(error, null);
            } else {
                callback(null, results);
            }
        });

    },
    insertProduct: function (Product_Name, Product_short_desc, Product_desc, callback) {
        const sql = `INSERT INTO Products (Product_Name, Product_short_desc, Product_desc) VALUES (?, ?, ?);`;
        db.query(sql, [Product_Name, Product_short_desc, Product_desc], callback);
    },

    updateProductDetails: function (Product_Id, Product_Name, Product_short_desc, Product_desc, callback) {
        const sql = `UPDATE Products SET Product_Name = ?, Product_short_desc = ?, Product_desc = ? WHERE Product_Id = ?;`;
        db.query(sql, [Product_Name, Product_short_desc, Product_desc, Product_Id], callback);
    },

    deleteProduct: function (productId, callback) {
        const sql = `DELETE FROM Products WHERE Product_Id = ?;`;
        db.query(sql, [productId], callback);
    }

}

module.exports=admin;
