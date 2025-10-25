import { Router } from 'express';
import { listComplaints, createComplaint, updateComplaintStatus } from '../controllers/complaints.controller';
const router = Router();

router.get('/', listComplaints);
router.post('/', createComplaint);
router.put('/:id/status', updateComplaintStatus);

export default router;