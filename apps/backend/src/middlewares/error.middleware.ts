export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // TEMPORAL — para diagnosticar
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ message });
};