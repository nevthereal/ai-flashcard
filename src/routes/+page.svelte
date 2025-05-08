<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { createUploader } from '$lib';
	import { UploadButton } from '@uploadthing/svelte';

	let { data } = $props();

	let { form, enhance } = superForm(data.form);

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

<SuperDebug data={form} />
<form use:enhance method="POST" action="?/new">
	<input
		bind:value={$form.prompt}
		placeholder="Additional Context"
		class="flex-grow rounded-lg p-2 ring-2 ring-gray-400"
	/>
	<UploadButton multiple {uploader} />

	<button class="rounded-lg bg-sky-300 px-4 py-2 font-mono font-bold" type="submit">Send</button>
</form>
