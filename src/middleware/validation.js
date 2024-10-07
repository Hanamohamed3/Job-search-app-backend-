// To validate the user information before signing in by joi package
export const validate=(schema)=>{
    return (req,res,next)=>{
        let{error}=schema.validate(req.body,{abortEarly:false})
        if(!error){
            next()
        }else{
            res.status(400).json({message:error.details})
        }

        }
    }
