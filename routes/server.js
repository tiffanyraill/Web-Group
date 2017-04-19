/**
 * Created by tiffanyraill on 2017-03-28.
 * This page is the configuration for email functionality
 * I have created an email address that the app sends all email to.
 * It has been tested and is functional. Note: there is no subject line.
 */
var express = require('express');
var nodemailer = require("nodemailer");
var router = express.Router();

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'put your owner email here',
        pass: 'put your own password here'
    }
});

/*------------------Routing Started ------------------------*/

router.get('/',function(req,res){
    res.sendfile('index.ejs');
});


router.post('/send',function(req,res){
    console.log(req.body)
    var mailOptions={
        name: req.body.name,
        to: 'put the owner email here',
        email: req.body.email,
        subject: req.body.subject,
        text: req.body.comments
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.render('index', {
                    message: 'Error - Email not sent'
                }
            );
        }else{
            console.log("Message sent: " + response.message);
            res.render('index', {
                    message: 'Message Sent!'
                }
            );
        }
    });
});

module.exports = router;
