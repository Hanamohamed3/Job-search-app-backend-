import exceljs from 'exceljs';
import moment from 'moment';
import jobModel from '../../../db/model/job.model.js';
import applicationModel from '../../../db/model/application.model.js';


const bonus= async (req, res) => {
        const { companyId, date } = req.query;

        if (!companyId || !date) {
            return res.status(400).json({ message: 'Company ID and date are required.' });
        }
        const formattedDate = moment(date, 'YYYY-MM-DD', true);
        if (!formattedDate.isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Use Year-Month-Date.' });
        }
        const jobs = await jobModel.find({ addedBy: companyId });
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found for this company.' });
        }
        const applications = await applicationModel.find({
            jobId: { $in: jobs.map(job => job._id) },
            applicationDate: {
                $gte: formattedDate.startOf('day').toDate(),
                $lte: formattedDate.endOf('day').toDate()
            }
        }).populate('userId', 'Fname Lname email');
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Applications');

        worksheet.columns = [
            { header: 'Application ID', key: '_id', width: 30 },
            { header: 'Job ID', key: 'jobId', width: 30 },
            { header: 'User First Name', key: 'Fname', width: 20 },
            { header: 'User Last Name', key: 'Lname', width: 20 },
            { header: 'User Email', key: 'email', width: 30 },
            { header: 'Application Date', key: 'applicationDate', width: 20 }
        ];

        applications.forEach(app => {
            worksheet.addRow({
                _id: app._id,
                jobId: app.jobId,
                Fname: app.userId.Fname,
                Lname: app.userId.Lname,
                email: app.userId.email,
                applicationDate: moment(app.applicationDate).format('YYYY-MM-DD')
            });
        });

        res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        await workbook.xlsx.write(res);
        res.end();

   
};

export default bonus;