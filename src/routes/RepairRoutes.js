import express from 'express';
import RepairController from '../controllers/RepairController.js';

const router = express.Router();

router.get('/', RepairController.showForm);
router.post('/', RepairController.createRequest);

export default router;