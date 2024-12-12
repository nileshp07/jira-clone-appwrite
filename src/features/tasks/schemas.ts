import {z} from 'zod';
import {TaskStatus} from './types';

export const createTaskSchema = z.object({
	name: z.string().trim().min(3, 'Required'),
	status: z.nativeEnum(TaskStatus, {required_error: 'Required'}),
	workspaceId: z.string().trim().min(3, 'Required'),
	projectId: z.string().trim().min(3, 'Required'),
	dueDate: z.coerce.date(),
	assigneeId: z.string().trim().min(3, 'Required'),
	description: z.string().optional(),
});
