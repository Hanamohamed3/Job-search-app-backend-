import express from 'express';
import { verifyToken } from '../../middleware/verifyToken.js';
import { authorizeRole } from '../../middleware/authorization.js';
import { addJob, applyJob, deleteJob, filterJobs, getAllJobs, getSpecificJob, updateJob } from './job.controller.js';



const jobRoutes=express.Router();
jobRoutes.post('/addJob', verifyToken,authorizeRole(['Company_HR']),addJob);
jobRoutes.patch('/updateJob/:id', verifyToken,authorizeRole(['Company_HR']),updateJob);
jobRoutes.delete('/deleteJob/:id', verifyToken,authorizeRole(['Company_HR']),deleteJob);
jobRoutes.get('/getAllJobs', verifyToken,authorizeRole(['Company_HR','User']),getAllJobs);
jobRoutes.get('/getSpecificJob', verifyToken,authorizeRole(['Company_HR','User']),getSpecificJob)
jobRoutes.get('/jobs/filter', verifyToken,authorizeRole(['Company_HR','User']),filterJobs)
jobRoutes.post('/apply', verifyToken,authorizeRole(['User']),applyJob);




export default jobRoutes