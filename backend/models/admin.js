const db=require('../config/database');

const admin={

    //# region Use-Case 8: Business Policies

    /**
     * POST: Inserts a new policy into the database.
     *
     * @param {string} policy_name - The HTTP request object.
     * @param {string} policy_desc - The HTTP request object.
     * @param {function} callback - A callback function to handle the results.
     */
    insertpolicy: function (policy_name, policy_desc, callback) {
        const sql = "INSERT INTO Business_Policies (Policy_Name, Policy_Desc) VALUES (?, ?)";
        db.query(sql, [policy_name, policy_desc], callback);
    },

    /**
     * GET: Retrieves all policy names.
     * @param {function} callback - A callback function to handle the results.
     */
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

    /**
     * GET: Gets the policy description.
     *
     * @param {string} policy_name - The HTTP request object.
     * @param {function} callback - A callback function to handle the results.
     */
    //get the policy description for the selected policy_name
    getpolicydesc: function (policy_name, callback) {
        const sql = "SELECT Policy_Desc FROM Business_Policies WHERE Policy_Name = ?";
        db.query(sql, [policy_name], callback);
    },

    /**
     * PUT: Updates the description for a specific policy in the database.
     *
     * @param {string} policy_name - The HTTP request object.
     * @param {string} policy_desc - The HTTP request object.
     * @param {function} callback - A callback function to handle the results.
     */
    updatepolicy: function (policy_name, policy_desc, callback) {
        const sql = "UPDATE Business_Policies SET Policy_Desc = ? WHERE Policy_Name = ?";
        db.query(sql, [policy_desc, policy_name], callback);
    },

    /**
     * DELETE: Deletes the policy with selected name.
     *
     * @param {string} policy_name - The HTTP request object.
     * @param {function} callback - A callback function to handle the results.
     */
    //get the policy description for the selected policy_name
    deletepolicy: function (policy_name, callback) {
        const sql = "DELETE FROM Business_Policies WHERE Policy_Name = ?";
        db.query(sql, [policy_name], callback);
    },


    //# endregion

    //# region Use-Case 11: Admin .
    /**
     * Inserts a new policy rate into the database.
     *
     * @param {string} Policy_Name - The name of the policy for which to insert the rate.
     * @param {number} rate - The rate value to be inserted.
     * @param {function} callback - A callback function to handle the operation's result.
     */
    insertpolicyrate: function(Policy_Name,rate,callback)
    {
        const sql = "INSERT INTO Policy_Rates (Policy_Name, rate) VALUES (?, ?)";
        db.query(sql, [Policy_Name, rate], callback);
    },

    /**
     * Updates the rate for a specific policy in the database.
     *
     * @param {string} Policy_Name - The name of the policy for which to update the rate.
     * @param {number} rate - The new rate value.
     * @param {function} callback - A callback function to handle the operation's result.
     */
    updatepolicyrate: function (Policy_Name,rate, callback) {
        const sql = "UPDATE Policy_Rates SET rate = ? WHERE Policy_Name = ?";
        db.query(sql, [rate, Policy_Name], callback);
    },

    /**
     * Retrieves all policy names and their associated rates from the database.
     *
     * @param {function} callback - A callback function to handle the query results.
     */
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

    /**
     * DELETE: Deletes the policy rate with selected name.
     *
     * @param {string} policy_name - The HTTP request object.
     * @param {function} callback - A callback function to handle the results.
     */
    //get the policy description for the selected policy_name
    deletepolicyrate: function (policy_name, callback) {
        const sql = "DELETE FROM Policy_Rates WHERE Policy_Name = ?";
        db.query(sql, [policy_name], callback);
    }
    //# endregion



}

module.exports=admin;
