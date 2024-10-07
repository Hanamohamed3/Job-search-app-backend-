
import express from 'express';
import { authorizeRole } from '../../middleware/authorization.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import bonus from './bonus.controller.js';


const bonusRoutes=express.Router();

bonusRoutes.get('/application/excel', verifyToken,authorizeRole(['Company_HR']),bonus);




export default bonusRoutes