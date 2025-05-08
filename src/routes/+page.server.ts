import { createOpenAI } from '@ai-sdk/openai';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { generateObject } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';

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

export const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(promptForm));

	return {
		form
	};
};

export const actions: Actions = {
	new: async ({ request }) => {
		console.log('Hit');
		const form = await superValidate(request, zod(promptForm));
		console.log(form.data);

		if (!form.valid) {
			return fail(400, form);
		}

		const { object, finishReason } = await generateObject({
			model: openai('gpt-4o-mini'),
			system:
				'You are a flashcard generator. Generate flashcards for the given text, résumé or photo. If vocabulary is provided, add the gender of the term in parentheses.',
			messages: [
				{
					role: 'user',
					content: form.data.prompt,
					experimental_attachments: form.data.files.map((file) => ({
						url: file.url,
						mime_type: file.contentType
					}))
				}
			],
			schema: z.object({
				term: z.string(),
				definition: z.string()
			}),
			output: 'array'
		});

		console.log(finishReason);

		console.log(object);

		return { form };
	}
};
