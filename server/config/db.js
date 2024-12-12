import { Sequelize } from 'sequelize';

const config = {
    username: 'sa',
    password: 'P@ssw0rd!',
    host: '10.4.15.101',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            "encrypt": false,
        }
    }
};

const sequelizePatientData = new Sequelize('CDG_PATIENT_DATA', config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
});

const sequelizeCDGCore = new Sequelize('CDG_CORE', config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
});

const setConnection = async () => {
    try {
        await sequelizePatientData.authenticate();
        await sequelizeCDGCore.authenticate();
    } catch (err) {
        console.error('Unable to connect to the databases:', err);
    }
};

export default { sequelizePatientData, sequelizeCDGCore, setConnection };