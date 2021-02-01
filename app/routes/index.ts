import express from 'express';
import salesDesk from './sales-desk';

const router = express.Router();

router.use('/sales-desk', salesDesk);

export default router;