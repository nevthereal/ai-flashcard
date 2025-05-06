import type { OurFileRouter } from '$lib/server/ut';

import { generateSvelteHelpers } from '@uploadthing/svelte';

export const { createUploader, createUploadThing } = generateSvelteHelpers<OurFileRouter>();
