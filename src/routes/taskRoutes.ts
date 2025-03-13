import { Router, RequestHandler } from 'express';
import { Task, CreateTaskDto, UpdateTaskDto } from '../domain/Task';
import { TaskRepository } from '../repositories/TaskRepository';

export const router = Router();

const taskRepository = new TaskRepository()

type TaskParams = { id: string };

const getAllTasks: RequestHandler = async (_req, res) => {
    const tasks = await taskRepository.findAll();
    res.json(tasks);
};

const createTask: RequestHandler<{}, Task, CreateTaskDto> = async (req, res) => {
    const taskDto = req.body;
    const createdTask = await taskRepository.create(taskDto);
    res.status(201).json(createdTask);
};

const getTaskById: RequestHandler<TaskParams> = async (req, res) => {
    const task = await taskRepository.findById(req.params.id);
    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    res.json(task);
};

const updateTask: RequestHandler<TaskParams, Task | { message: string }, UpdateTaskDto> = async (req, res) => {
    const task = await taskRepository.findById(req.params.id);
    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    const updates = req.body;
    const updatedTask = await taskRepository.update(req.params.id, updates);
    if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    res.json(updatedTask);
};

const deleteTask: RequestHandler<TaskParams> = async (req, res) => {
    const deleted = await taskRepository.delete(req.params.id);
    if (!deleted) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    res.status(204).send();
};

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask); 