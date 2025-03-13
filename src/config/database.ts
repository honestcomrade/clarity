import { PrismaClient } from '@prisma/client'

export const getDatabaseUrl = () => {
    const env = process.env.NODE_ENV || 'development';
    
    if (env === 'test') {
        return process.env.TEST_DATABASE_URL;
    }
    
    return process.env.DATABASE_URL;
};

const prismaClientSingleton = () => {
    const url = getDatabaseUrl();
    if (!url) {
        throw new Error('Database URL not configured');
    }

    return new PrismaClient({
        datasources: {
            db: { url }
        },
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
});