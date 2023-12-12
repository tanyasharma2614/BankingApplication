const https = require('https');
const bcrypt = require('bcryptjs');
const url = require('url');
const Admin = require('../models/admin');


const adminController = {

    //UC-8 BEGIN
    //GET
    //Gets all the policies name
    getAllPolicyNames: function (req, res) {
        try {
            Admin.getpoliciesname((error, results) => {
                if (error) {
                    console.error('Getting all the policy names failed:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'policy names get failed', error }));
                } else {
                    if (results.length === 0) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'No policy names found' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        const responseData = {
                            success: true,
                            message: 'Data Received Successfully',
                            data: results,
                        };
                        res.end(JSON.stringify(responseData));
                    }
                }
            });
        } catch (error) {
            console.error('Getting all the policy names failed:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'policy names get failed', error }));
        }
    },

    //POST
    //Inserts Policy in the database
    //Body: Policy_Name, Policy_Desc
    //JSON format
    insertPolicy: function (req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const requestData = JSON.parse(body);
                const Policy_Name = requestData['Policy_Name'];
                const Policy_Desc = requestData['Policy_Desc'];

                if (!Policy_Name || !Policy_Desc) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing Policy_Name or Policy_Desc in the request body' }));
                } else {
                    Admin.insertpolicy(Policy_Name, Policy_Desc, (error, results) => {
                        if (error) {
                            console.error('Insert failed:', error);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Business Policy Insert failed', error }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            const responseData = {
                                success: true,
                                message: 'Data Inserted Successfully',
                                data: { Policy_Name, Policy_Desc },
                            };
                            res.end(JSON.stringify(responseData));
                        }
                    });
                }
            } catch (error) {
                console.error('Business Policy Insert failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Business Policy Insert failed', error }));
            }
        });
    },

    //GET
    //Gets the description for the given policy name
    //query param: Policy_Name
    getPolicyDesc: function (req, res) {
        const parsed_url = url.parse(req.url, true);
        const policy_name = parsed_url.query.policyname;

        if (!policy_name) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Missing policy_name in the request body' }));
            return;
        }

        Admin.getpolicydesc(policy_name, (error, results) => {
            if (error) {
                console.log('Business Policy Get failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Business Policy Get failed', error }));
            } else {
                if (!results) {
                    console.log('No Business Policy with the name ' + policy_name + ' found');
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'No Business Policy with the name ' + policy_name + ' found' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    const responseData = {
                        success: true,
                        message: 'Data Retrieved Successfully',
                        data: results, // Remove the unnecessary object around 'results'.
                    };
                    res.end(JSON.stringify(responseData));
                }
            }
        });
    },

    //PUT
    //updates the value of the selected policy description
    //Body: Policy_Name and Policy_Desc
    //JSON
    updatePolicy: function (req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const requestData = JSON.parse(body);
                const Policy_Name = requestData['Policy_Name'];
                const Policy_Desc = requestData['Policy_Desc'];

                if (!Policy_Name || !Policy_Desc) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing or invalid Policy_Name or Policy_Desc in the request body' }));
                } else {
                    Admin.updatepolicy(Policy_Name, Policy_Desc, (error, results) => {
                        if (error) {
                            console.error('Policy Description Update failed:', error);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Policy Description Update failed', error }));
                        }
                        else if(results.affectedRows===0)
                        {
                            console.error('No Policy with the name found:', Policy_Name);
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'No Policy with the name found', Policy_Name }))
                        }
                        else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            const responseData = {
                                success: true,
                                message: 'Data Updated Successfully',
                                data: { Policy_Name, Policy_Desc },
                            };
                            res.end(JSON.stringify(responseData));
                        }
                    });
                }
            } catch (error) {
                console.error('Policy Description Update failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Policy Description Update failed', error }));
            }
        });
    },

    //DELETE
    //Deletes the selected policy name
    //Query: Policy_Name
    //JSON
    deletePolicy: function (req, res) {
        const parsed_url = url.parse(req.url, true);
        const Policy_Name = parsed_url.query.policyname; // Correct the query parameter name.

        if (!Policy_Name) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing or invalid Policy_Name in the query' }));
            return;
        }

        Admin.deletepolicy(Policy_Name, (error, results) => {
            if (error) {
                console.error('Policy Delete failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Policy Delete failed', error }));
            } else if (results.affectedRows === 0) {
                console.error('No Policy with the name found:', Policy_Name);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No Policy with the name found', Policy_Name }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const responseData = {
                    success: true,
                    message: 'Data Deleted Successfully',
                    data: { Policy_Name },
                };
                res.end(JSON.stringify(responseData));
            }
        });
    },
    //UC-8 END

    //UC-11 BEGIN
    //GET
    //Gets all the policy rate names
    getAllPolicyRates: function (req, res) {
        try {
            Admin.getpoliciesrates((error, results) => {
                if (error) {
                    console.error('Getting all the policy rates failed:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Getting all the policy rates failed', error }));
                } else {
                    if (results.length === 0) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'No policy rates found' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        const responseData = {
                            success: true,
                            message: 'Data Received Successfully',
                            data: results,
                        };
                        res.end(JSON.stringify(responseData));
                    }
                }
            });
        } catch (error) {
            console.error('Getting all the policy rates failed:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Getting all the policy rates failed', error }));
        }
    },

    //POST
    //GET Insert Policy rate name and value in the database
    //Body: Policy_Name and rate
    //JSON
    insertPolicyRates: function (req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const requestData = JSON.parse(body);
                const Policy_Name = requestData['Policy_Name'];
                const rate = parseFloat(requestData['rate']);

                if (!Policy_Name || !rate) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing Policy_Name or Rate in the request body' }));
                }
                else if(rate<0){
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Rate cannot be negative' }));
                }
                else {
                    Admin.insertpolicyrate(Policy_Name, rate, (error, results) => {
                        if (error) {
                            console.error('Insert failed:', error);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Business Policy Insert failed', error }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            const responseData = {
                                success: true,
                                message: 'Data Inserted Successfully',
                                data: { Policy_Name, rate },
                            };
                            res.end(JSON.stringify(responseData));
                        }
                    });
                }
            } catch (error) {
                console.error('Business Policy Insert failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Business Policy Insert failed', error }));
            }
        });
    },

    //PUT
    //updates the value of the selected policy rate
    //Body: Policy_Name and rate
    //JSON
    updatePolicyRate: function (req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const requestData = JSON.parse(body);
                const Policy_Name = requestData['Policy_Name'];
                const rate = parseFloat(requestData['rate']);

                if (!Policy_Name || isNaN(rate)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing or invalid Policy_Name or Rate in the request body' }));
                } else if (rate < 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Rate cannot be negative' }));
                } else {
                    Admin.updatepolicyrate(Policy_Name, rate, (error, results) => {
                        if (error) {
                            console.error('Policy Rate Update failed:', error);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Policy Rate Update failed', error }));
                        }
                        else if(results.affectedRows===0)
                        {
                            console.error('No Policy with the name found:', Policy_Name);
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'No Policy with the name found', Policy_Name }))
                        }
                            else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            const responseData = {
                                success: true,
                                message: 'Data Updated Successfully',
                                data: { Policy_Name, rate },
                            };
                            res.end(JSON.stringify(responseData));
                        }
                    });
                }
            } catch (error) {
                console.error('Policy Rate Update failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Policy Rate Update failed', error }));
            }
        });
    },

    //DELETE
    //Deletes the selected policy name
    //Query: Policy_Name
    //JSON
    deletePolicyRate: function (req, res) {
        const parsed_url = url.parse(req.url, true);
        const Policy_Name = parsed_url.query.policyname;

        if (!Policy_Name) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing or invalid Policy_Name in the query' }));
            return;
        }

        Admin.deletepolicyrate(Policy_Name, (error, results) => {
            if (error) {
                console.error('Policy Rate Delete failed:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Policy Rate Delete failed', error }));
            } else if (results.affectedRows === 0) {
                console.error('No Policy with the name found:', Policy_Name);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No Policy with the name found', Policy_Name }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const responseData = {
                    success: true,
                    message: 'Data Deleted Successfully',
                    data: { Policy_Name },
                };
                res.end(JSON.stringify(responseData));
            }
        });
    }


}

module.exports = adminController;