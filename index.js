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
let support = 'developer@ellopod.ng, ademola.onasoga@gmail.com'


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
      orderBy :
         {
          Premium: 'asc' 
         },

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
        let transporter = nodemailer.createTransport({
          host: "smtp-relay.sendinblue.com",
          port: 587,
          secure: false, 
          auth: {
            user: 'developer@hellodemola.com', 
            pass: process.env.sendInBlue, 
          },
        });
      
        let info = await transporter.sendMail({
          from: '"Ethan 👻" <developer@hellodemola.com>', 
          bcc: support,
          replyTo: support,
          to: email, 
          subject: "Welcome to Yousure.ng ✔", 
          html: "Hi " +firstName + " Your OTP is " + "<b>" + opt + "</b>", 
        });

        //add number to db
        await prisma.user_table.create({
          data: {
            fname: firstName,
            email: email,
          }
        })

        res.json({
            firstName: firstName,
            email: email,
            opt: opt
        })
        console.log("Message sent: %s", info.messageId);
      }
      
      main().catch(console.error);
})

app.post('/optin', (req, res) =>{
  email = req.body.email
  firstName = req.body.firstName
  lastName = req.body.lastName
  address = req.body.address
  phone = req.body.phone
  productType = req.body.productType
  var opt = Math.floor(100000 + Math.random() * 900000);
  var allEmail = email; 
  async function main() {
      let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false, 
        auth: {
          user: 'developer@hellodemola.com', 
          pass: process.env.sendInBlue, 
        },
      });
    
      let info = await transporter.sendMail({
        from: '"Ethan 👻" <developer@hellodemola.com>', 
        to: email, 
        cc: support,
        replyTo: support,
        subject: "Your HMO registration has been received.", 
        html: `Hi <b>${firstName} ${lastName}</b>, <br/><br/> Your ${productType} application has been received and you will contacted shortly via ${phone} `, 
      });

      //add number to db
      await prisma.optin.create({
        data: {
          fname: firstName,
          lname: lastName,
          phone: phone,
          address: address,
          policy: productType,
          email: email,
        }
      })

      res.status(200).send('successfully')

      console.log("Message sent: %s", info.messageId);
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
      cc: 'developer@ellopod.ng',
      replyTo: support,
      subject: "Welcome on board ✔", // Subject line
    //   text: "Hello world?", // plain text body
      html: "<b>Your OTP is </br>" + opt, // html body
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

