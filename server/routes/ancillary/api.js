import express from 'express';
import AncillaryController from "../../controllers/AncillaryController.js";

const ancillaryRoutes = express.Router();

ancillaryRoutes.get('/get-opd-ancillary-orders', async (req, res) => {
    try {
        const opdOrders = await AncillaryController.getOPDOrders();
        res.status(200).json(opdOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

ancillaryRoutes.get('/get-er-ancillary-orders', async (req, res) => {
    try {
        const erOrders = await AncillaryController.getEROrders();
        res.status(200).json(erOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

ancillaryRoutes.get('/get-ipd-ancillary-orders', async (req, res) => {
    try {
        const ipdOrders = await AncillaryController.getIPDOrders();
        res.status(200).json(ipdOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default ancillaryRoutes;