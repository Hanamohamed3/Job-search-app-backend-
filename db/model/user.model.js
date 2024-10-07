import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
    // Model for the User collection required in field1
    Fname:String,
    Lname:String,
userName:{
    type:String,
    unique: true,

},
    email:{
        type:String,
        unique:true,
    },
    password:String,
    recoveryEmail:String,
    DOB:Date,
    mobileNumber:{
        type:Number,
        unique:true,
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
      },
      status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
      }


})


userSchema.pre('save', function (next) {
        this.userName = `${this.Fname}${this.Lname}`;
    next();
});

const userModel= mongoose.model("User",userSchema)
export default userModel;





