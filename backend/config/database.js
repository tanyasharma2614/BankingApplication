const mysql=require('mysql');
require('dotenv').config();
const dbConfig={
    host:'localhost',
    user:'root',
<<<<<<< HEAD
<<<<<<< Updated upstream
    password:'password',
=======
    password: 'password',
>>>>>>> Stashed changes
=======
    password: process.env.DB_PSWD,
>>>>>>> main
    database:'bank'
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err)=>{
    if(err){
        console.error('Error connecting to database:',err);
    }else{
        console.log('Connected to the database');
    }
});
module.exports=connection;