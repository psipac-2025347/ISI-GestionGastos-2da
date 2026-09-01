import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
    }
    next();
  };
};