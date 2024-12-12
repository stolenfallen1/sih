import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const { sequelizeCDGCore } = db;

const mscDosages = sequelizeCDGCore.define('mscDosages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dosage_id: {
        type: DataTypes.STRING(10),
    },
    description: {
        type: DataTypes.STRING(100),
    },
    frequency: {
        type: DataTypes.INTEGER,
    },
    isactive: {
        type: DataTypes.SMALLINT,
    },
    createdby: {
        type: DataTypes.STRING(25),
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updatedby: {
        type: DataTypes.STRING(25),
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'mscDosages',
    schema: 'dbo',
    timestamps: false,
});

export default mscDosages;