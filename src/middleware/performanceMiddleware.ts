import { Request, Response, NextFunction } from 'express'

export const trackPerformance = (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now()
    
    res.on('finish', () => {
        const duration = performance.now() - start
        console.log({
            path: req.path,
            method: req.method,
            duration: `${duration}ms`,
            status: res.statusCode
        })
    })
    
    next()
} 