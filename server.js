import express from 'express'
import userRoutes from './modules/user/user.routes.js'

import cors from 'cors'
import AccRoutes from './modules/account/account.routes.js'

const app = express()
const port = 3000


app.use(express.json())
app.use(cors())
app.use("/auth",userRoutes)
app.use("/account", AccRoutes)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))