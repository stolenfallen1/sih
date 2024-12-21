import { DataTypes } from "sequelize";
import { FOREIGNKEYS } from "sequelize/lib/query-types";
import Allergies from "~/components/master-file/forms/patient/Allergies.vue";
import db from "~/server/config/db";

const { sequelizePatientRegistry } = db;

const PatientRegistry = sequelizePatientRegistry.define('PatientRegistry', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    branch_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patient_Id: {
        foreignkey: DataTypes.INTEGER,
        allowNull: false
    },
    case_No: {
        type: DataTypes.INTEGER,
        primaryKey: true  
    },
    er_Case_No: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    register_Source: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    register_Casetype: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    register_Link_Case_No: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    register_Case_No_Consolidate: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    patient_Age: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    er_Bedno: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    room_Code: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    room_Rate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    mscAccount_Type: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    mscAccount_Discount_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscAccount_Trans_Types: {
        type: DataTypes.CHAR(1),
        allowNull: true
    },
    mscAdmission_Type_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscPatient_Category: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscPrice_Groups: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mscPrice_Schemes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mscService_Type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscService_Type2: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscDiet_Meal_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscDisposition_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscTriage_level_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscCase_Result_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscCase_Indicators_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscPrivileged_Card_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mscBroughtBy_Relationship_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    queue_Number: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    arrived_Date: {
        type: DataTypes.DATETIME,
        allowNull: true
    },
    registry_Status: { 
        type: DataTypes.STRING(1),
        allowNull: true
    },
    registry_Hostname: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
})