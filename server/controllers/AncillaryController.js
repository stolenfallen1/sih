import NurseLogBook from "../models/cdg_patient_data/NurseLogBook.js";

async function getOPDOrders () {
    try {
        const nurseLogData = await NurseLogBook.findAll({
            where: {
                patient_Type: 'O',
                record_Status: 'X',
                revenue_Id: 'CS',
                issupplies: 1,
            },
            order: [['createdAt', 'DESC']]
        });

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
                section_Id: record.section_Id,
                price: record.price,
                amount: record.amount,
                record_Status: record.record_Status,
                user_Id: record.user_Id,
                request_Date: record.request_Date,
                user_Id: record.user_Id,
                remarks: record.remarks,
                dcrdate: record.dcrdate,
            });

            return acc;
        }, {});

        const formattedData = Object.values(groupedData);
        return formattedData;

    } catch (error) {
        console.error('Error fetching OPD Orders: ', error);
    }
}

async function getEROrders () {
    try {
        const nurseLogData = await NurseLogBook.findAll({
            where: {
                patient_Type: 'E',
                record_Status: 'X',
                revenue_Id: 'CS',
                issupplies: 1,
            },
            order: [['createdAt', 'DESC']]
        });

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
                section_Id: record.section_Id,
                price: record.price,
                amount: record.amount,
                record_Status: record.record_Status,
                user_Id: record.user_Id,
                request_Date: record.request_Date,
                user_Id: record.user_Id,
                remarks: record.remarks,
                dcrdate: record.dcrdate,
            });

            return acc;
        }, {});

        const formattedData = Object.values(groupedData);
        return formattedData;

    } catch (error) {
        console.error('Error fetching ER Orders: ', error);
    }
}

async function getIPDOrders () {
    try {
        const nurseLogData = await NurseLogBook.findAll({
            where: {
                patient_Type: 'I',
                record_Status: 'X',
                revenue_Id: 'CS',
                issupplies: 1,
            },
            order: [['createdAt', 'DESC']]
        });

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
                section_Id: record.section_Id,
                price: record.price,
                amount: record.amount,
                record_Status: record.record_Status,
                user_Id: record.user_Id,
                request_Date: record.request_Date,
                user_Id: record.user_Id,
                remarks: record.remarks,
                dcrdate: record.dcrdate,
            });

            return acc;
        }, {});

        const formattedData = Object.values(groupedData);
        return formattedData;

    } catch (error) {
        console.error('Error fetching IPD Orders: ', error);
    }
}

export default {
    getOPDOrders,
    getEROrders,
    getIPDOrders,
};