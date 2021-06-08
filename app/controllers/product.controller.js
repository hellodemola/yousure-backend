/* eslint-disable max-len */
// import dotenv from 'dotenv';
// import https from 'https';

// import { checkSchema } from 'express-validator';
// import { validator } from '../middlewares/user';
// import { registrationSchema, loginSchema } from '../validation/user';
// import { saveOTP } from '../services/user';
// import { checkIfOtpExists, transporter } from '../utils/helpers';
// import User from '../models/user';
// import User from '../models/user';

// dotenv.config();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const getAllPolicies = async (req, res, next) => {
    const policies = await prisma.table_1.findMany({      
        include: { offering_ : true }  
    }).then((policy) => res.send(policy))
    .catch(err => res.status(400) )

    console.log(policies)
}


module.exports = getAllPolices;