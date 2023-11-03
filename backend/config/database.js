const mysql=require('mysql2');
require('dotenv').config();
const dbConfig={
    host:'localhost',
    user:'root',
    password: 'password',
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