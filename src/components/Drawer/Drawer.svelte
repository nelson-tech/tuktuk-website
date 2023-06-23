<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import BackArrow from '$icons/solid/angle-left.svg?component';
	import ProductDetails from '$components/ProductDetails/ProductDetails.svelte';
	import type { EventHandler } from 'svelte/elements';
	import useProductStore from '$stores/product';
	import Cart from '$components/Cart';

	const productStore = useProductStore();

	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		bgDrawer: 'bg-purple-900 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl'
	};

	const handleClose: EventHandler<Event> = (e) => {
		switch (drawerSettings.id) {
			case 'product':
				productStore.update((store) => ({ ...store, product: null }));
				break;
			case 'cart':
				// productStore.update((store) => ({ ...store, product: null }));
				break;

			default:
				break;
		}
		drawerStore.close();
	};
</script>

<Drawer bgDrawer="bg-black text-white" width="w-full h-full p-8" position="bottom">
	<div class="flex flex-col justify-between h-full">
		{#if $drawerStore.id === 'product'}
			<ProductDetails />
		{:else if $drawerStore.id === 'cart'}
			<Cart />
		{:else}
			<!-- (fallback contents) -->
		{/if}
		<footer
			class="p-2 flex justify-center items-center"
			on:click|preventDefault={handleClose}
			on:keydown={handleClose}
		>
			<div class="px-4 py-2">
				<BackArrow class="w-6 fill-white -rotate-90" />
			</div>
		</footer>
	</div>
</Drawer>
