import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'error' },
            { emit: 'stdout', level: 'warn' }
        ],
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

prisma.$on('query', (e: { query: string; params: string; duration: number }) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
})

export const getDatabaseUrl = () => {
    const env = process.env.NODE_ENV || 'development';
    
    if (env === 'test') {
        return 'postgresql://taskuser:taskpass@localhost:5433/taskdb_test';
    }
    
    return 'postgresql://taskuser:taskpass@localhost:5432/taskdb';
}; 