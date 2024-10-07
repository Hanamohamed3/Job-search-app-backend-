import mongoose, { Schema } from 'mongoose';
const   companySchema= new mongoose.Schema({
    // Model for the Company collection required in field1
    companyName:{
        type:String,
        unique:true,
    },
    description:String,
    industry:String,
    address:String,
    numberOfEmployees:String,
    companyEmail:{
        type:String,
        unique:true,
    },
    companyHR: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        
      },


   


})
const companyModel= mongoose.model("Company",companySchema)
export default companyModel;