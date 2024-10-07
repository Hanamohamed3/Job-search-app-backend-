import mongoose, { Schema } from 'mongoose';
const   jobSchema= new mongoose.Schema({
// Model for the Job collection required in field1
    jobTitle:String,
    jobLocation: {
        type: String,
        enum: ['onsite', 'remotely','hybrid'],
      },
      workingTime: {
        type: String,
        enum: ['full-time', 'part-time'],
      },
      seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level','Senior','Team-Lead','CTO'],
      },
      jobDescription:String,
      technicalSkills: {
        type: [String],
      },
      softSkills: {
        type: [String],
      },

      addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }

    

   


})
const jobModel= mongoose.model("Job",jobSchema)
export default jobModel;


