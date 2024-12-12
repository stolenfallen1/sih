import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const { sequelizeCDGCore } = db;

const fmsTransactionCodes = sequelizeCDGCore.define('fmsTransactionCodes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(100),
    },
    code: {
        type: DataTypes.STRING(5),
    },
    drcr: {
        type: DataTypes.STRING(5),
    },
    lgrp: {
        type: DataTypes.STRING(5),
    },
    group_code: {
        type: DataTypes.STRING(5),
    },
    inventory_code: {
        type: DataTypes.STRING(5),
    },
    warehouse_id: {
        type: DataTypes.STRING(5),
    },
    warehouse_map_itemid: {
        type: DataTypes.STRING(5),
    },
    medicare_group_id: {
        type: DataTypes.INTEGER,
    },
    isMedicine: {
        type: DataTypes.SMALLINT,
    },
    isSupplies: {
        type: DataTypes.SMALLINT,
    },
    isProcedure: {
        type: DataTypes.SMALLINT,
    },
    isActive: {
        type: DataTypes.SMALLINT,
    },
    createdby: {
        type: DataTypes.STRING(20),
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updatedby: {
        type: DataTypes.STRING(20),
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'fmsTransactionCodes',
    schema: 'dbo',
    timestamps: false,
});

export default fmsTransactionCodes;