// import { DataTypes } from "sequelize";
// import db from "../../config/db.js";
// const { sequelizePatientData } = db;

// const AdmittingCommunicationFile = sequelizePatientData.define('AdmittingCommunicationFile', { 
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true
//     },
//     patient_Id: {
//         type: DataTypes.STRING(10),
//     },
//     case_No: {
//         type: DataTypes.STRING(10),
//     },
//     room_Id: {
//         type: DataTypes.STRING(10),
//     },
//     admittedBy: {
//         type: DataTypes.STRING(100),
//     },
//     admittedDate: {
//         type: DataTypes.DATE,
//     },
//     requestDate: {
//         type: DataTypes.DATE,
//     },
//     requestBy: {
//         type: DataTypes.STRING(100),
//     },
//     canceledBy: {
//         type: DataTypes.STRING(100),
//     },
//     canceledDate: {
//         type: DataTypes.DATE,
//     },
//     dietID: {
//         type: DataTypes.STRING(10),
//     },
//     dietName: {
//         type: DataTypes.STRING(100),
//     },
//     diagnosis: {
//         type: DataTypes.STRING(255),
//     },
//     chiefComplaints: {
//         type: DataTypes.STRING(255),
//     },
//     dietRemarks: {
//         type: DataTypes.STRING(255),
//     },
//     howadmitted: {
//         type: DataTypes.STRING(255),
//     },
//     recordStatus: {
//         type: DataTypes.STRING(10),
//     },
//     createdBy: {
//         type: DataTypes.STRING(100),
//     },
//     createdat: {
//         type: DataTypes.DATE,
//     },
//     updatedby: {
//         type: DataTypes.STRING(100),
//     },
//     updatedat: {
//         type: DataTypes.DATE,
//     },
// });

// export default AdmittingCommunicationFile;