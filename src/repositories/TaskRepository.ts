import { BaseRepository } from './BaseRepository'
import { prisma } from '../config/database'
import { Task, CreateTaskDto, UpdateTaskDto } from '../domain/Task'

export class TaskRepository extends BaseRepository {
    async findAll(): Promise<Task[]> {
        return this.logQuery('findAll', () => 
            prisma.task.findMany({
                orderBy: { createdAt: 'desc' }
            })
        )
    }

    async findById(id: string): Promise<Task | null> {
        return this.logQuery('findById', () =>
            prisma.task.findUnique({
                where: { id }
            })
        )
    }

    async create(dto: CreateTaskDto): Promise<Task> {
        return this.logQuery('create', () =>
            prisma.task.create({
                data: dto
            })
        )
    }

    async update(id: string, dto: UpdateTaskDto): Promise<Task | null> {
        return this.logQuery('update', () =>
            prisma.task.update({
                where: { id },
                data: dto
            })
        )
    }

    async delete(id: string): Promise<boolean> {
        return this.logQuery('delete', async () => {
            const result = await prisma.task.delete({
                where: { id }
            })
            return !!result
        })
    }

    async findCompletedTasksLastWeek(): Promise<Task[]> {
        return this.logQuery('findCompletedTasksLastWeek', () =>
            prisma.task.findMany({
                where: {
                    completed: true,
                    updatedAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                }
            })
        )

        // If we need more performance maybe use raw SQL
        /* return this.logQuery('findCompletedTasksLastWeek', () =>
            prisma.$queryRaw<Task[]>`
                SELECT * FROM tasks 
                WHERE completed = true 
                AND updated_at >= NOW() - INTERVAL '7 days'
            `
        ) */
    }
} 