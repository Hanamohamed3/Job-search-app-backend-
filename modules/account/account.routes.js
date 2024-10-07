import * as AC  from './account.controller.js'
// import { signUp } from "./customer.controller.js";

import { Router } from 'express';
const AccRoutes = Router()
AccRoutes.post("/createAccount", AC.createAccount)
AccRoutes.post("/deposit/:id", AC.addDeposite)



export default AccRoutes;