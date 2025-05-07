import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { z } from 'zod';

const promptForm = z.object({
	prompt: z.string().min(1),
	files: z.array(
		z.object({
			name: z.string(),
			contentType: z.string(),
			url: z.string()
		})
	)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(promptForm));

	return {
		form
	};
};
