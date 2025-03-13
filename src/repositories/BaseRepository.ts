export class BaseRepository {
    protected async measureQuery<T>(
        name: string,
        query: () => Promise<T>
    ): Promise<T> {
        const start = performance.now()
        try {
            const result = await query()
            const duration = performance.now() - start
            
            if (duration > 100) { // Alert on slow queries
                console.warn(`Slow query detected: ${name} took ${duration}ms`)
            }
            
            return result
        } catch (error) {
            console.error(`Query ${name} failed:`, error)
            throw error
        }
    }

    protected async logQuery<T>(
        name: string, 
        queryFn: () => Promise<T>
    ): Promise<T> {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Executing query: ${name}`)
        }
        return this.measureQuery(name, queryFn)
    }
} 