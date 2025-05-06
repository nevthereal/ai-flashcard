<script lang="ts">
	import { createUploader } from '$lib';
	import { Uploader } from '@uploadthing/svelte';

	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			console.log(`onClientUploadComplete`, res);
			alert('Upload Completed');
		},
		onUploadError: (error: Error) => {
			alert(`ERROR! ${error.message}`);
		},
		url: 'api/ut'
	});
</script>

<form>
	<input placeholder="Additional Context" class="flex-grow rounded-lg p-2 ring-2 ring-gray-400" />
	<input type="file" multiple />
	<Uploader {uploader} />

	<button class="rounded-lg bg-sky-300 px-4 py-2 font-mono font-bold" type="submit">Send</button>
</form>
