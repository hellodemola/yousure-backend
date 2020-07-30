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


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

// route
app.get('/', async(req, res) => {
     // Retrieve all posts
     const allPosts = await prisma.offering_.findMany()
    res.send(allPosts)
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

        try {
            sgMail.setApiKey('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');
            const msg = {
                to: email,
                from: 'info@yousure.xyz',
                templateId: 'd-37d838a69d6e4e149524a59c4bea573c',
                dynamic_template_data: {
                 opt: opt
                },
                };
                sgMail.send(msg)
                .then(() => {
                    // Celebrate
                    res.json({
                        email: email,
                        firstName: firstName,
                        opt: opt
                    })
                  })
                  .catch(error => {
                    // Log friendly error
                    console.error(error);
                
                    if (error.response) {
                      // Extract error msg
                      const {message, code, response} = error;
                
                      // Extract response msg
                      const {headers, body} = response;
                
                      console.error(body);  
                    }
                });
               
        
           } catch (error) {
               res.json(error)
           } 
})

app.post('/verify/:email/:fname', async(req, res) => {
    var email = req.params.email;
    var fname = req.params.fname;
    var opt = Math.floor(100000 + Math.random() * 900000);
   try {
    sgMail.setApiKey('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');
    const msg = {
        to: email,
        from: 'info@yousure.xyz',
        templateId: 'd-37d838a69d6e4e149524a59c4bea573c',
        dynamic_template_data: {
         opt: opt
        },
        };
        sgMail.send(msg)
        .then(() => {
            // Celebrate
            res.json(`hi ${fname}, your verification code has been sent ${email} & ${opt}`)
          })
          .catch(error => {
            // Log friendly error
            console.error(error);
        
            if (error.response) {
              // Extract error msg
              const {message, code, response} = error;
        
              // Extract response msg
              const {headers, body} = response;
        
              console.error(body);
            }
        });
       

   } catch (error) {
       res.json(error)
   } 
  
   
})












let port = process.env.PORT;
if (port == null || port == '')
{
    port = 3900;
}
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

