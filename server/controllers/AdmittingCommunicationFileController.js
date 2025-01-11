import { Sequelize } from 'sequelize';
import AdmittingCommunicationFile from '../models/cdg_patient_data/AdmittingCommunicationFile.js';

async function getPatientForAdmissionCounts() {
    console.log('Fetching Patient Admission Counts...');
    try {
        const patientCounts = await AdmittingCommunicationFile.findAll({
            where: {
                admittedBy: null,
                admittedDate: null,
            },
            attributes: ['id', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
        });
        console.log('Patient Admission Counts: ', patientCounts);
        return patientCounts;
    } catch (error) {
        console.error('Error fetching Patient Admission Counts: ', error);
    }
}
export default {
    getPatientForAdmissionCounts
};