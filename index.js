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
        
    }).then( (policy) =>  {  if(policy.length > 0 )
                              {
                                res.send(policy)
                              }
                              else {
                                res.status(404).send('Not found')
                              }
                              }
                              )
    .catch(err => res.status(500))
    

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
        
    }).then((company) => res.send(company) )
     .catch(err => res.status(400) )
    // if (company.length > 0)
    // {
    //        res.send(company)
    // }
    // else{
    //     res.status(404).send('Not found!')
    // }

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
    var allEmail = email; 
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
            user: 'developer@hellodemola.com', // generated ethereal user
            pass: process.env.sendInBlue, // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Ethan 👻" <developer@hellodemola.com>', // sender  address
          to: email, // list of receivers
          subject: "Welcome to Yousure.ng ✔", // Subject line
        //   text: "Hello world?", // plain text body
          html: "Hi " +firstName + " <b>Your OTP is </b>" + opt, // html body
        });

        res.json({
            firstName: firstName,
            email: email,
            opt: opt
        })
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);
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
        user: 'developer@hellodemola.com', // generated ethereal user
        pass: process.env.sendInBlue, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Ethan 👻" <developer@hellodemola.com>', // sender  address
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

