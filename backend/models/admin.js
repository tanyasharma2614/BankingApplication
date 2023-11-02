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

    }



}

module.exports=admin;
