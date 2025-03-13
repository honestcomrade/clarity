import express, { Request, Response, NextFunction } from 'express';
import { router as taskRouter } from './routes/taskRoutes';
import { trackPerformance } from './middleware/performanceMiddleware';

const app = express();

app.use(express.json());
app.use(trackPerformance);

app.use('/v1/api/tasks', taskRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 