<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	import useUIStore from '$stores/ui';

	const uiStore = useUIStore();

	import CartShoppingFast from '$icons/solid/cart-shopping-fast.svg?component';
	import PowerOff from '$icons/solid/power-off.svg?component';

	const powerOff: EventHandler<Event> = (e) => {
		uiStore.update((store) => ({ ...store, activated: false }));
	};

	const handleClick: EventHandler<Event> = (e) => {
		console.log(e);
	};
</script>

<div
	on:click|preventDefault={powerOff}
	on:keydown|preventDefault={powerOff}
	class="absolute top-4 right-8 p-4"
>
	<PowerOff class={`fill-white text-black w-8`} />
</div>
<div on:click={handleClick} on:keydown={handleClick} class="absolute bottom-4 right-8 p-4">
	<CartShoppingFast class={`fill-white text-black w-8`} />
</div>
