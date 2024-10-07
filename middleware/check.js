import { connection } from "../db/connection.js"

const connect=connection()
import bcrypt from 'bcrypt';
export const check =(req,res,next)=>{
    connect.execute(`select username from user where username ='${req.body.username}'`,(err,data)=>{
        if(data.length !=0 ){
           return res.status(409).json({message:"Already register,please signIn"})
        }else{
req.body.password= bcrypt.hashSync(req.body.password,8);
console.log(hashedPassword);

            next()
        }
    })

}
// import { connection } from "../db/connection";
// const connect=connection()
// import bcrypt from 'bcrypt';
// import { check } from './check';

// export const check=(req,res,next)=>{
//     connect.execute(`select username fr`)
// }