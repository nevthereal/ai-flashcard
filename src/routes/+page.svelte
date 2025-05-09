<script lang="ts">
	import { enhance } from '$app/forms';
	import { Chat } from '@ai-sdk/svelte';

	let chat = new Chat();

	let attachments = $state<FileList | undefined>(undefined);
</script>

<!-- <SuperDebug data={form} /> -->
<main class="mx-auto mt-4 max-w-lg">
	<h1 class="mb-6 text-center text-4xl font-bold">Shindlr</h1>
	<form
		onsubmit={(e) => {
			chat.handleSubmit(e, { experimental_attachments: attachments });
			attachments = undefined;
		}}
		use:enhance
		class="flex flex-col gap-4"
	>
		<input placeholder="Provide some context..." class="input w-full" bind:value={chat.input} />
		<input type="file" class="file-input w-full" multiple bind:files={attachments} />
		<button class="btn btn-primary" type="submit">Send</button>
	</form>
</main>
