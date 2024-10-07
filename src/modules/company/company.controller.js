import companyModel from "../../../db/model/company.model.js";
import jobModel from './../../../db/model/job.model.js';
import applicationModel from './../../../db/model/application.model.js';

const addCompany= async(req,res)=>{
    let addedCompany= await companyModel.insertMany(req.body)
    res.status(201).json({message:"Company added",addedCompany})
}


const updatCompanyData= async(req,res)=>{
    let updatedData=await companyModel.findByIdAndUpdate(req.params.id,{description:req.body.description},{new:true})
    // let updatedData=await companyModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:"Updated",updatedData})
}


const deleteCompany=async(req,res)=>{
    let deletedCompany=await companyModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Deleted",deletedCompany})
}

const getComapnyData=async (req,res)=>{
    let Company=await companyModel.find()
    res.status(200).json({message:"Done",Company})
}



 const search=async (req, res) => {
    try {
        const companies = await companyModel.find({ companyName: new RegExp(req.query.name, 'i') });
        res.status(200).json({message:"Done",companies});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





const getSpecificApp = async (req, res) => {
        const { jobId } = req.params;
        const companyId = req.user.companyId;
        const job = await jobModel.findOne({ _id: jobId, companyId });
        if (!job) {
            return res.status(404).json({ message: 'Job not found or you do not have permission to view this job.' });
        }
        const applications = await applicationModel.find({ jobId }).populate('userId', 'Fname Lname email');

        return res.status(200).json(applications);
    } 


export {
    addCompany,
    updatCompanyData,
    deleteCompany,
    getComapnyData,
    search,
    getSpecificApp
};
