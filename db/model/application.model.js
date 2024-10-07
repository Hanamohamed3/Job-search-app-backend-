import mongoose, { Schema } from 'mongoose';
const   applicationSchema= new mongoose.Schema({
// Model for the application collection required in field1
    jobId: {
        type: Schema.Types.ObjectId,
        ref:'Job'

      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
     
      userTechSkills: {
        type: [String],
      },

      userSoftSkills: {
        type: [String],
      },
      userResume:String,
})
const applicationModel= mongoose.model("Application",applicationSchema)
export default applicationModel;