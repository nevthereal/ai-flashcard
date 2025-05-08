// import { createOpenAI } from '@ai-sdk/openai';
// import { z } from 'zod';
// import { generateObject } from 'ai';

// import { OPENAI_API_KEY } from '$env/static/private';

// export async function POST({ request }) {
// 	console.log('hit');
// 	const { messages } = await request.json();

// 	const { object, finishReason } = await generateObject({
// 		model: _openai('gpt-4.1-mini'),
// 		messages,
// 		schema: z.object({
// 			term: z.string(),
// 			definition: z.string()
// 		}),
// 		system:
// 			'You are a flashcard generator. Generate flashcards for the given text, résumé or photo. If vocabulary is provided, add the gender of the term in parentheses.',
// 		output: 'array'
// 	});

// 	console.log(object);

// 	return new Response(JSON.stringify(object));
// }
