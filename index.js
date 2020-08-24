const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();
const sanitizeHTML = require("sanitize-html");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
var nodemailer = require('nodemailer');


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

// route
app.get('/', async(req, res) => {
     // Retrieve all posts
    //  const allPosts = await prisma.offering_.findMany()
    res.send('this is working')
})

app.get('/policy/:type', async(req, res) => {
    // Retrieve all posts
    var type = req.params.type
    const policy = await prisma.table_1.findMany({
        where: {
           Covers: type
        },
        include: {
           offering_ : true  
            }
        
    })
    if (policy.length > 0)
    {
           res.send(policy)
    }
    else{
        res.status(404).send('Not found!')
    }

})

app.get('/count/:number', async(req, res) => {
    // Retrieve all posts
    var number = req.params.number
    const policy = await prisma.table_1.findMany({
       where: {
        Number : number
       },
        include: {
           offering_ : true  
            }
        
    })
    if (policy.length > 0)
    {
           res.send(policy)
    }
    else{
        res.status(404).send('Not found!')
    }

})

app.get('/company', async(req, res) => {
    // Retrieve all companies
    const company = await prisma.table_1.findMany({
       
        include: {
           offering_ : true  
            }
        
    })
    if (company.length > 0)
    {
           res.send(company)
    }
    else{
        res.status(404).send('Not found!')
    }

})

app.get('/company/:name', async(req, res) => {
    // Retrieve all posts
    var name = req.params.name
    const policy = await prisma.table_1.findMany({
        where: {
           Company: name
        },
        include: {
           offering_ : true  
            }
        
    })
    if (policy.length > 0)
    {
           res.send(policy)
    }
    else{
        res.status(404).send('Not found!')
    }

})

app.get('/policy/get/:uid', async(req, res) => {
    var policyId = req.params.uid
    var productId = parseInt(policyId)
    // Retrieve all posts
    const allPosts = await prisma.offering_.findOne({
        where: {
            pro_id: productId
        },
      include:  {
            table_1: true
        }
    })
   res.json(allPosts)
})

app.post('/verified', (req, res) =>{
    email = req.body.email
    firstName = req.body.firstName
    var opt = Math.floor(100000 + Math.random() * 900000);
    var allEmail = email + ' , developer@hellodemola.com'; 
  
    var transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          user: 'info@yousure.xyz',
          pass: process.env.sendInBlue
        }
      });
      
      var mailOptions = {
        from: 'info@yousure.xyz',
        to: allEmail,
        subject: 'Welcome on Board',
        text:'Hi '+ firstName + ' your OTP for the https://yousure..xyz website is ' + opt
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


  res.json({
    email: email,
    firstName: firstName,
    opt: opt
}) 
})

app.post('/verify/:email/:fname', async(req, res) => {
    var email = req.params.email;
    var fname = req.params.fname;
    var opt = Math.floor(100000 + Math.random() * 900000);
  
    // async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'info@yousure.xyz', // generated ethereal user
        pass: process.env.sendInBlue, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Ethan 👻" <info@yousure.xyz>', // sender address
      to: email, // list of receivers
      subject: "Welcome on board ✔", // Subject line
    //   text: "Hello world?", // plain text body
      html: "<b>Your OTP is </b>" + opt, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
  
  
   
})












let port = process.env.PORT;
if (port == null || port == '')
{
    port = 3900;
}
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

