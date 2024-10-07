
import { connection } from './../../db/connection.js';
import bcrypt from 'bcrypt';


const connect=connection()

 const register = async (req, res) => {
    const query = `SELECT * from user where username = "${req.body.username}"`;
    connect.execute(query, (err, result) => {
        if (result.length >= 1) {
            return res.status(409).json({ message: "username already used" });
        } else {
            const query2 = `INSERT INTO user
                (username, password)
                VALUES
                ('${req.body.username}',  '${req.body.password}')`;
                connect.execute(query2, (err, result) => {
                    // if(err) return res.status(400).json ({message:"DB err",err})
                    //            if(result.length ==0 ){
                        
                    //     res.json({message:"not registered yet,please register first"})
                        
                    //            }else{
                        
                    //             // console.log(data[0].password);
                    //             const matched = bcrypt.compareSync(password, data[0].password);
                    //             if (matched) {
                    //                 res.status(200).json({ message: "welcome" })
                    //             } else {
                    //                 res.status(400).json({ message: "Invalid username or password" })
                        
                    //             }
                    //         }
                if (result) {
                    return res.status(201).json({ message: "rigistered successfully!" });
                } 
            });
        }
    });
};


 const login= async (req, res) => {
    const query=  `SELECT * from user where username ='${req.body.username}' and password = '${req.body.password}'`
    connect.execute(query,(err,result)=>{
        if( result.length >= 1){
            // token ?????????????????????????????????????????????
            return res.json({message:"Logged in sucessfully"})
        }else{
            return res.json({message:"username or password is incorrect"})
        }
    })
}
export {
    register,
    login
}