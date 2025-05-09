import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { generateObject } from 'ai';

import { OPENAI_API_KEY } from '$env/static/private';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request }) {
	console.log('hit');
	const { messages } = await request.json();

	const { object } = await generateObject({
		model: openai('gpt-4o'),
		messages,
		schema: z.object({
			term: z.string().describe('The term to be defined'),
			definition: z.string().describe('The definition of the term')
		}),
		system:
			`You are a flashcard generator.` +
			`Generate flashcards for the given text, résumé or photo.` +
			`If vocabulary is provided, add the gender of the term in parentheses.` +
			`If a pdf or image of a script is provided, generate flashcards about the subject of the script.` +
			`The user's input is only really important for context, what is important are the attached files. You generate flashcards out of those.`,
		output: 'array'
	});

	console.log(object);

	return new Response(JSON.stringify(object));
}
