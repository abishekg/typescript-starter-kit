import express from 'express';
const router = express.Router();
import path from 'path';

export default router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "../../../public/index.html"));
})