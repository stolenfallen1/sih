import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const { sequelizePatientData } = db;

const NurseLogBook = sequelizePatientData.define('NurseLogBook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    branch_Id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    patient_Id: {
        type: DataTypes.STRING(10),
    },
    case_No: {
        type: DataTypes.STRING(10),
    },
    patient_Name: {
        type: DataTypes.STRING(1000),
    },
    revenue_Id: {
        type: DataTypes.STRING(5),
    },
    requestNum: {
        type: DataTypes.STRING(20),
    },
    referenceNum: {
        type: DataTypes.STRING(20),
    },
    item_Id: {
        type: DataTypes.STRING(10),
    },
    description: {
        type: DataTypes.STRING(255),
    },
    specimen_Id: {
        type: DataTypes.STRING(4),
    },
    Quantity: {
        type: DataTypes.FLOAT,
    },
    item_OnHand: {
        type: DataTypes.FLOAT,
    },
    item_ListCost: {
        type: DataTypes.FLOAT,
    },
    dosage: {
        type: DataTypes.STRING(10),
    },
    price: {
        type: DataTypes.FLOAT,
    },
    amount: {
        type: DataTypes.FLOAT,
    },
    record_Status: {
        type: DataTypes.STRING(1),
    },
    user_Id: {
        type: DataTypes.STRING(10),
    },
    request_Date: {
        type: DataTypes.DATE,
    },
    request_PrintedBy: {
        type: DataTypes.STRING(10),
    },
    request_PrintDate: {
        type: DataTypes.DATE,
    },
    process_By: {
        type: DataTypes.STRING(10),
    },
    process_Date: {
        type: DataTypes.DATE,
    },
    result_By: {
        type: DataTypes.STRING(10),
    },
    result_Date: {
        type: DataTypes.DATE,
    },
    change_Date: {
        type: DataTypes.DATE,
    },
    change_By: {
        type: DataTypes.STRING(10),
    },
    station_Id: {
        type: DataTypes.STRING(10),
    },
    remarks: {
        type: DataTypes.STRING(500),
    },
    stat: {
        type: DataTypes.STRING(1),
    },
    dcrdate: {
        type: DataTypes.DATE,
    },
    procedure_Name: {
        type: DataTypes.STRING(500),
    },
    issupplies: {
        type: DataTypes.STRING(1),
    },
    ismedicine: {
        type: DataTypes.STRING(1),
    },
    isprocedure: {
        type: DataTypes.STRING(1),
    },
    isGeneric: {
        type: DataTypes.STRING(1),
    },
    isMajorOperation: {
        type: DataTypes.STRING(1),
    },
    isDialysis: {
        type: DataTypes.STRING(1),
    },
    package_Id: {
        type: DataTypes.STRING(10),
    },
    createdat: {
        type: DataTypes.DATE,
    },
    createdby: {
        type: DataTypes.STRING(25),
    },
    updatedat: {
        type: DataTypes.DATE,
    },
    updatedby: {
        type: DataTypes.STRING(25),
    },
    cancelBy: {
        type: DataTypes.STRING(10),
    },
    cancelDate: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'NurseLogBook',
    schema: 'dbo',
    timestamps: false,
});

export default NurseLogBook;