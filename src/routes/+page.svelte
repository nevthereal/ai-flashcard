<script lang="ts">
	import { createUploadThing } from '$lib';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { error } from '@sveltejs/kit';

	import type { Attachment } from 'ai';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form } = superForm(data.form);

	let attachments = $state<Attachment[] | undefined>(undefined);

	const { startUpload, isUploading } = createUploadThing('imageUploader', {
		onClientUploadComplete: (files) => {
			attachments = files.map((f) => {
				return {
					url: f.ufsUrl,
					contentType: f.type,
					name: f.name
				};
			});
		}
	});

	$inspect(attachments);
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
				const files = e.currentTarget.files;
				if (!files || files.length === 0) return;
				// Convert FileList to File[] and start the upload
				await startUpload(Array.from(files));
			}}
		/>
		<Button variant="default" type="submit" disabled={$isUploading}>Send</Button>
	</form>
	<h1>Files</h1>
	{#if attachments}
		{#each attachments as attachment}
			<div>
				<h1>{attachment.name}:</h1>
				<img src={attachment.url} alt={attachment.name} />
			</div>
		{/each}
	{/if}
</main>
