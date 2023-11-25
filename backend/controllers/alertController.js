const http=require('https')
const sendEmail=require('../config/email.js')

const alertController={
    alert: function(req,res){
        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        });
        req.on('end',async()=>{
            try{
                const emailRequest=JSON.parse(data);
                if(!emailRequest.emailID || !emailRequest.subject || !emailRequest.body){
                    res.writeHead(400,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:'Please provide email address, subject and body'}));
                    return;
                }else{
                    sendEmail(emailRequest.emailID,emailRequest.subject,emailRequest.body,(error)=>{
                        if(error){
                            console.log('Email sending failed 1:',error);
                            res.writeHead(500,{'Content-Type':'application/json'});
                            res.end(JSON.stringify({message:'Email sending failed',error}));
                            return;
                        }else{
                            res.writeHead(200,{'Content-Type':'application/json'});
                            res.end(JSON.stringify({message:'Email sent successfully'}));
                            return;
                        }
                    });
                }
            }catch(error){
                console.error('Email sending failed:',error);
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Email sending failed',error}));
                return;
            }
        });
    }
}
module.exports=alertController;