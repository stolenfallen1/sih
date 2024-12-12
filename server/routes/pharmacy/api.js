import express from 'express';
import PharmacyController from "../../controllers/PharmacyController.js";

const pharmaRoutes = express.Router();

pharmaRoutes.get('/get-opd-pharma-orders', async (req, res) => {
    try {
        const opdOrders = await PharmacyController.getOPDOrders();
        res.status(200).json(opdOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default pharmaRoutes;