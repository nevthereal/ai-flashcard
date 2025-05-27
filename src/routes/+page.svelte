<script lang="ts">
	import { createUploadThing } from '$lib';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { error } from '@sveltejs/kit';

	import type { Attachment } from 'ai';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form } = superForm(data.form);

	const { startUpload } = createUploadThing('imageUploader', {
		onClientUploadComplete: () => {
			alert('Upload Completed');
		}
	});

	let attachments = $state<Attachment[] | undefined>(undefined);
</script>

<!-- <SuperDebug data={form} /> -->
<main class="mx-auto mt-4 max-w-lg">
	<h1 class="mb-6 text-center text-4xl font-bold">Shindlr</h1>
	<form class="flex flex-col gap-4">
		<Input placeholder="Provide some context..." bind:value={$form.title} />
		<Input
			type="file"
			multiple
			onchange={async (e) => {
				const file = e.currentTarget.files?.[0];
				if (!file) return;
				// Do something with files
				// Then start the upload
				const utFile = await startUpload([file]);
				if (!utFile) return error(500, 'Failed to upload file');

				attachments = utFile?.map((f) => {
					return {
						url: f.ufsUrl,
						contentType: f.type,
						name: f.name
					};
				});
			}}
		/>
		<Button variant="default" type="submit">Send</Button>
	</form>
</main>
