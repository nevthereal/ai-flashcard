import { generateObject } from 'ai';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { createOpenAI } from '@ai-sdk/openai';
import { OPENAI_API_KEY } from '$env/static/private';

const FlashCard = z.object({
	title: z.string().min(3),
	files: z.array(
		z.object({
			name: z.string(),
			contentType: z.string(),
			url: z.string()
		})
	)
});

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(FlashCard));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(FlashCard));

		const res = await generateObject({
			model: openai('gpt-4.1-mini'),
			schema: z.object({
				term: z.string().describe('The term to be defined'),
				definition: z.string().describe('The definition of the term'),
				gender: z
					.string()
					.describe('The grammatical gender of the term if specified in the source material')
					.nullable()
			}),
			output: 'array',
			system: `
			You are an expert flashcard generator designed for exam preparation. Your primary goal is to extract key information from the provided attachments and format it into a structured JSON array of flashcards. Each flashcard should be detailed enough for effective study.
			**Output Requirements:**
			*   Generate a JSON array where each element is an object representing a single flashcard.
			*  
			**Content Generation Guidelines:**

			1.  **For Vocabulary Lists:**
				*   term: The vocabulary term.
				*   definition: The definition of the term.
				*   gender: The grammatical gender of the term if specified in the source material.

			2.  **For PDF or Image Scripts/Documents (e.g., lecture notes, textbook chapters):**
				*   **Identify Core Information:** Focus on extracting definitions, key facts, important dates, names of significant individuals or theories, steps in processes, cause-and-effect relationships, or concise summaries of main arguments/sections.
				*   **Formulate 'Front' Content:** Create clear questions, prompts for definitions, or key terms for the front of the flashcard.
				*   **Provide Detailed 'Back' Content:** The back should contain comprehensive yet concise answers, explanations, or relevant details.
				*   **Ensure Sufficient Detail & Coverage:** Generate a quantity of flashcards that thoroughly covers the main topics and essential details within the document, making them genuinely useful for exam preparation.

			**General Instructions:**
			*   Base flashcard content strictly on the information present in the attachments.
			*   User input serves only for contextual understanding; the attachments are the sole source for flashcard generation.
			*   Strive for clarity and accuracy in each flashcard.`,
			messages: [
				{ role: 'user', experimental_attachments: form.data.files, content: form.data.title }
			]
		});
		return { form };
	}
};
