import userModel from "../../../db/model/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



// signup api that takes in req.body(Fname,,Lname,userName,email,password, DOB ,mobileNumber,role,status) to add user in DB
const signup=async (req,res)=>{
    let addedUser=await userModel.insertMany(req.body)
    addedUser[0].password=undefined;
    delete addedUser[0].password
res.status(201).json({message:"User Added",addedUser})
}

// signin api that takes in req.body(email,password) to sign user in DB and give token and change statue from offline to online once logging in

const signIn = async (req, res) => {
    let foundedUser = await userModel.findOne({email: req.body.email})
    if( !foundedUser || !bcrypt. compareSync(req.body.password, foundedUser.password))
    return res.status(404).json({message:"invalid email or password"})
    foundedUser.status = 'online';
    await foundedUser.save();

let token = jwt.sign({id:foundedUser._id,role:foundedUser.role  }, "Exam")
    res.status(200).json({message:"Welcome",token,foundedUser:{
        status:foundedUser.status
    } })

}


const updateUser= async(req,res)=>{
    const { id } = req.params;

    const {  email,mobileNumber } = req.body;
    if (email) {
        const existingUser = await userModel.findOne({ email });
        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json({ message: "Email is already used by another account" });
        }
    }
    if (mobileNumber) {
        const existingUser = await userModel.findOne({ mobileNumber });
        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json({ message: "Mobile Number is already used by another account" });
        }
    }
    let updatedUser=await userModel.findByIdAndUpdate(req.params.id,{Fname:req.body.Fname,Lname:req.body.Lname,email,mobileNumber,recoveryEmail:req.body.recoveryEmail,DOB:req.body.DOB},{new:true})
    res.status(200).json({message:"Updated",updatedUser})
}



const deleteUser=async(req,res)=>{
    let deletedUser=await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Account deleted successfully",deletedUser})
}
        


const getSpecificAccData=async (req,res)=>{
    let users=await userModel.findById(req.params.id)
    res.status(200).json({message:"Done",users})
}



const getDataForDiffUser= async (req,res)=>{
    try {
        const userId = req.params.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
}




const updatePassword = async (req, res) => {
    
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }
        const user = await userModel.findById({_id:req.params.id});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
req.body.newPassword= bcrypt.hashSync(req.body.newPassword,10)
        await user.save();
        res.status(200).json({ message: "Password updated successfully"});
    
};




const forgetPassword = async (req,res)=>{

    try {
        const { email, newPassword } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
}


const aacountsByRec = async (req,res)=>{
    try {
        const { recoveryEmail } = req.query;

        const users = await userModel.find({ recoveryEmail });
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
};





export{
    signup,
    signIn,
    updateUser,
    deleteUser,
    getSpecificAccData,
    getDataForDiffUser,
    updatePassword,
    forgetPassword,
    aacountsByRec
    
}