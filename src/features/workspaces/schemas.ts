import {z} from 'zod';

export const createWorkspaceSchema = z.object({
	name: z.string().trim().min(1, 'Workspace name is required'),
	image: z
		.union([
			z.instanceof(Blob),
			z
				.string()
				.optional()
				.transform((value) => (value === '' ? undefined : value)),
		])
		.optional(),
});

export const updateWorkspaceSchema = z.object({
	name: z.string().trim().min(1, 'Must be 1 or more characters').optional(),
	image: z
		.union([
			z.instanceof(Blob),
			z
				.string()
				.optional()
				.transform((value) => (value === '' ? undefined : value)),
		])
		.optional(),
});
