import { Router } from 'express';
import { IncomeController } from './income.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createIncomeSchema } from './income.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const incomeController = new IncomeController();

router.post('/', authMiddleware, validate(createIncomeSchema), incomeController.create.bind(incomeController));
router.get('/summary', authMiddleware, incomeController.summary.bind(incomeController));

export default router;