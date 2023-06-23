<script lang="ts">
	import { onMount } from 'svelte';

	let time = new Date();

	$: formattedTime = time.toLocaleTimeString('en-US', {
		timeZone: 'America/Phoenix',
		hour: 'numeric',
		minute: '2-digit'
	});

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{formattedTime.split(':')[0]}<span class="animate-pulse">:</span>{formattedTime.split(':')[1]}
