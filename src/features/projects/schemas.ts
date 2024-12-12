import {z} from 'zod';

export const createProjectSchema = z.object({
	name: z.string().trim().min(1, 'Project name is required'),
	image: z
		.union([
			z.instanceof(Blob),
			z
				.string()
				.optional()
				.transform((value) => (value === '' ? undefined : value)),
		])
		.optional(),
	workspaceId: z.string(),
});

export const updateProjectSchema = z.object({
	name: z.string().trim().min(1, 'Minimum 3 characters required').optional(),
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
