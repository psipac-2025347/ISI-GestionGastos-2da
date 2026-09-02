import { Response, NextFunction } from 'express';
import { IncomeService } from './income.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

const incomeService = new IncomeService();

export class IncomeController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const income = await incomeService.create(req.user!.sub, req.body);
      res.status(201).json(income);
    } catch (error) {
      next(error);
    }
  }

  async summary(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const summary = await incomeService.getSummary(req.user!.sub);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  }
}