export interface Task {
    readonly id: string;
    readonly title: string;
    readonly completed: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskDto = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>; 