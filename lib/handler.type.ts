import { Request, Response, NextFunction} from 'express';

export type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void
