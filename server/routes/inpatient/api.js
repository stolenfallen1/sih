// import express from 'express';
// import AdmittingCommunicationFileConroller from "../../controllers/AdmittingCommunicationFileController.js";

// const admittingCommunicationFileRoutes = express.Router();

// admittingCommunicationFileRoutes.get('/get-patient-admission-counts', async (req, res) => {
//     try {
//         const patientCounts = await AdmittingCommunicationFileConroller.getPatientForAdmissionCounts();
//         res.status(200).json(patientCounts);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default admittingCommunicationFileRoutes;