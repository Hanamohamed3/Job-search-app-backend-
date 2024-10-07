import jwt from 'jsonwebtoken'
// To check the user if already logged in by having Token in the header of postman
export const verifyToken=(req,res,next)=>{
    let {token}=req.headers
    jwt.verify(token,'Exam',async(err,decoded)=>{
        if(err) return res.status(401).json({message: "token error",err})
     req.user=decoded
    next()       
})
}