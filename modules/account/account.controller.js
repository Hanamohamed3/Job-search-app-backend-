// import conn from './../../db/connection.js';
import { connection } from './../../db/connection.js';
import bcrypt from 'bcrypt';


const connect=connection()

export const createAccount = async (req, res) => {
    const query = `SELECT * from account where email = "${req.body.email}"`;
    connect.execute(query, (err, result) => {
        if (result.length >= 1) {
            return res.status(409).json({ message: "Email already used" });
        } else {
            const query2 = `INSERT INTO account
                (name, username, email, password, phone,balance)
                VALUES
                ('${req.body.name}', '${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.phone}')`;
                connect.execute(query2, (err, result) => {
                if (result) {
                    return res.status(201).json({ message: "Signed up successfully!" });
                } 
            });
        }
    });
};

export const addDeposite = async (req, res) => {
    const query = `SELECT * from account where email = "${req.body.email}"`;
    connect.execute(query, (err, result) => {
        if (result.length >= 1) {
            const query2 = `INSERT INTO account
                (deposit)
                VALUES
                ( '${req.body.deposit}')`;
                connect.execute(query2, (err, result) => {
                    return res.status(201).json({ message: "deposite added!" });
                
            });
        }
    });
};


// export const withDraw = async (req, res) => {
//     const query = `SELECT * from account where email = "${req.body.email}"`;
//     connect.execute(query, (err, result) => {
//         if (result.length >= 1) {
//             return res.status(409).json({ message: "Can't with draw" });
//         } else {
//             const query2 = `INSERT INTO account
//                 (name, username, email, password, phone)
//                 VALUES
//                 ('${req.body.name}', '${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.phone}')`;
//                 connect.execute(query2, (err, result) => {
//                 if (result) {
//                     return res.status(201).json({ message: "Signed up successfully!" });
//                 } 
//             });
//         }
//     });
// };