import express from 'express'
import { dbConnection } from './db/dbConnection.js';
import userRoutes from './src/modules/user/user.routes.js';
import companyRoutes from './src/modules/company/company.routes.js';
import jobRoutes from './src/modules/job/job.routes.js';
import bonusRoutes from './src/modules/Bonus/bonus.routes.js';


const app = express()
const port = 3000
app.use(express.json())


dbConnection


app.use(userRoutes)
app.use(companyRoutes)
app.use(jobRoutes)
app.use(bonusRoutes)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))