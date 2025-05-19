<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
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
		<Input placeholder="Provide some context..." bind:value={chat.input} />
		<Input type="file" multiple bind:files={attachments} />
		<Button variant="default" type="submit">Send</Button>
	</form>
</main>
