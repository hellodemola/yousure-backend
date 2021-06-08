import express from 'express';
import {getAllPolicies} from '../controllers/product.controller'

const router = express.Router();

// const Authentication = new Auth();

router.post('/policies/all', getAllPolicies);

export default router;