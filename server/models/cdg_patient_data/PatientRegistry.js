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
    }
})