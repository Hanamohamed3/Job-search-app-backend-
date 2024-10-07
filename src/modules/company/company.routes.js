import express from 'express';
import {  authorizeRole } from '../../middleware/authorization.js';
import { addCompany, deleteCompany, getComapnyData, getSpecificApp, search, updatCompanyData } from './company.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const companyRoutes=express.Router();
companyRoutes.post('/addCompany', verifyToken,authorizeRole(['Company_HR']),addCompany);
companyRoutes.patch('/update/:id', verifyToken,authorizeRole(['Company_HR']),updatCompanyData);
companyRoutes.delete('/deleteCompany/:id', verifyToken,authorizeRole(['Company_HR']),deleteCompany);
companyRoutes.get('/get', verifyToken,authorizeRole(['Company_HR']),getComapnyData);
companyRoutes.get('/search', verifyToken,authorizeRole(['Company_HR','User']),search);
companyRoutes.get('/specific/:id/application', verifyToken,authorizeRole(['Company_HR']),getSpecificApp);



export default companyRoutes
