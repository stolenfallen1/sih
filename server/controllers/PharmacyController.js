import { Op } from "sequelize";

import NurseLogBook from "../models/cdg_patient_data/NurseLogBook.js";
import fmsTransactionCodes from "../models/cdg_core/fmsTransactionCodes.js";
import mscDosages from "../models/cdg_core/mscDosages.js";

async function getOPDOrders() {
    try {

        const medicineCodes = await fmsTransactionCodes.findAll({
            where: {
                isMedicine: 1,
            },
            attributes: ['code'],
        })

        const medicineCodeList = medicineCodes.map(code => code.code);

        const nurseLogData = await NurseLogBook.findAll({
            where: {
                patient_Type: 'O',
                record_Status: 'X',
                revenue_Id: {
                    [Op.in]: medicineCodeList,
                },
            },
            order: [['createdAt', 'DESC']]
        });

        const dosages = await mscDosages.findAll();
        const dosageMap = dosages.reduce((acc ,dosage) => {
            acc[dosage.dosage_id] = dosage;
            return acc;
        }, {});

        const groupedData = nurseLogData.reduce((acc, record) => {
            if (!acc[record.requestNum]) {
                acc[record.requestNum] = {
                    patient_Id: record.patient_Id,
                    case_No: record.case_No,
                    requestNum: record.requestNum,
                    patient_Name: record.patient_Name,
                    items: [],
                };
            }

            const dosageData = dosageMap[record.dosage_id] || { 
                dosage_id: 'N/A',
                description: 'N/A',
                frequency: 'N/A',
            }

            acc[record.requestNum].items.push({
                id: record.id,
                branch_Id: record.branch_Id,
                patient_Type: record.patient_Type,
                revenue_Id: record.revenue_Id,
                referenceNum: record.referenceNum,
                item_Id: record.item_Id,
                description: record.description,
                specimen_Id: record.specimen_Id,
                Quantity: record.Quantity,
                item_OnHand: record.item_OnHand,
                item_ListCost: record.item_ListCost,
                dosage: dosageData,
                section_Id: record.section_Id,
                price: record.price,
                amount: record.amount,
                record_Status: record.record_Status,
                user_Id: record.user_Id,
                request_Date: record.request_Date,
                station_Id: record.station_Id,
                remarks: record.remarks,
                stat: record.stat,
                dcrdate: record.dcrdate,
            });

            return acc;
        }, {});

        const formattedData = Object.values(groupedData);
        return formattedData;

    } catch (err) {
        console.error('Error fetching OPD Orders: ', err);
    }
}

export default { getOPDOrders };