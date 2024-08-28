import { Request, Response, NextFunction } from 'express';
import HttpException from '../util/HttpException';
export default function errorMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction): void;
