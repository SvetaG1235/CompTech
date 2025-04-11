import express from 'express';
import MasterController from '../controllers/MasterController.js';

const router = express.Router();

router.get('/', MasterController.showForm);
router.post('/', MasterController.createRequest);

export default router;