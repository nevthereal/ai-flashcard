<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';

	const chat = new Chat();

	let attachments = $state<FileList | undefined>(undefined);
</script>

<form
	onsubmit={(e) => {
		chat.handleSubmit(e, { experimental_attachments: attachments });
		attachments = undefined;
	}}
>
	<input
		placeholder="Additional Context"
		class="flex-grow rounded-lg p-2 ring-2 ring-gray-400"
		bind:value={chat.input}
	/>
	<input type="file" multiple bind:files={attachments} />

	<button class="rounded-lg bg-sky-300 px-4 py-2 font-mono font-bold" type="submit">Send</button>
</form>
