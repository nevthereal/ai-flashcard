<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { createUploader } from '$lib';
	import { UploadButton } from '@uploadthing/svelte';

	let { data } = $props();

	let { form } = superForm(data.form);

	let fileURL = $state<string | null>(null);

	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			console.log(`onClientUploadComplete`, res);
			$form.files = res.map((f) => {
				return {
					name: f.name,
					contentType: f.type,
					url: f.ufsUrl
				};
			});
		},
		onUploadError: (error: Error) => {
			alert(`ERROR! ${error.message}`);
		},
		url: 'api/ut'
	});
</script>

<SuperDebug {form} />
<form method="post" action="?/new">
	<input placeholder="Additional Context" class="flex-grow rounded-lg p-2 ring-2 ring-gray-400" />
	<UploadButton {uploader} />

	<button class="rounded-lg bg-sky-300 px-4 py-2 font-mono font-bold" type="submit">Send</button>
</form>
