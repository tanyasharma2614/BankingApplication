const mysql=require('mysql');

const dbConfig={
    host:'127.0.0.1',
    user:'root',
<<<<<<< Updated upstream
    password:'password',
=======
    password: 'password',
>>>>>>> Stashed changes
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