import applicationModel from "../../../db/model/application.model.js";
import jobModel from "../../../db/model/job.model.js";



const addJob = async (req, res) => {
    let addedJob = await jobModel.insertMany(req.body)
    res.status(201).json({ message: "Job added", addedJob })
}


const updateJob = async (req, res) => {
    // let updatedData=await companyModel.findByIdAndUpdate(req.params.id,{description:req.body.description},{new:true})
    let updatedJob = await jobModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: "Updated Job", updatedJob })
}

const deleteJob = async (req, res) => {
    let deletedJob = await jobModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Deleted Job", deletedJob })
}


const getAllJobs = async (req, res) => {
    let jobs = await jobModel.find()
    res.status(200).json({ message: "Done", jobs })
}


const getSpecificJob = async (req, res) => {
    const { companyName } = req.query;

    if (!companyName) {
        return res.status(400).json({ message: "Company name is required." });
    }

    let Jobs = await jobModel.find({ companyName }).populate('addedBy', 'userName email')
    res.status(200).json({ message: "Done", Jobs })
}



const filterJobs = async (req, res) => {
    const filters = req.query;

    const query = {};
    if (filters.workingTime) query.workingTime = filters.workingTime;
    if (filters.jobLocation) query.jobLocation = filters.jobLocation;
    if (filters.seniorityLevel) query.seniorityLevel = filters.seniorityLevel;
    if (filters.jobTitle) query.jobTitle = new RegExp(filters.jobTitle, 'i');
    if (filters.technicalSkills) query.technicalSkills = { $all: filters.technicalSkills.split(',') };
    const jobs = await jobModel.find(query).populate('addedBy', 'userName email');
    res.status(200).json({ message: "done", jobs });

};



const applyJob = async (req, res) => {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(400).json({ message: "Job ID is required." });
    }
    const application = new applicationModel({
        jobId,
        userId: req.user._id
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully.", application });
}



export {
    addJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getSpecificJob,
    filterJobs,
    applyJob
};