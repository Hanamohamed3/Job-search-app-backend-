import mongoose from'mongoose';
// Db connection to connect code yo database in mongoDb compass
export const dbConnection =mongoose.connect(`mongodb://localhost:27017/Exams`)
.then(()=> console.log("DB connected"))
.catch((err)=> console.log("Db error",err))