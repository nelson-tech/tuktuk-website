<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import type { EventHandler } from 'svelte/elements';

	const uiStore = useUIStore();

	import useUIStore from '$stores/ui';
	import CartShoppingFast from '$icons/solid/cart-shopping-fast.svg?component';
	import PowerOff from '$icons/solid/power-off.svg?component';

	import Clock from '$components/Clock';
	import Drawer from '$components/Drawer';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';

	const togglePower: EventHandler<Event> = (e) => {
		uiStore.update((store) => ({ ...store, activated: !store.activated }));
		drawerStore.close();
	};

	const handleCartClick: EventHandler<Event> = (e) => {
		if ($uiStore.shopping) {
			drawerStore.open({ id: 'cart' });
		} else {
			uiStore.update((store) => ({ ...store, shopping: true, clock: false }));
		}
	};

	const enlargeClock: EventHandler<Event> = (e) => {
		uiStore.update((store) => ({ ...store, shopping: false, clock: true }));
	};

	export let data: LayoutData;
	$: ({ GetCart } = data);

	$: cart = $GetCart.data?.getCart;
</script>

<div class={`bg-black min-h-screen ${$uiStore.shopping ? '' : 'overflow-hidden'}`}>
	<header class="sticky top-0 bg-black z-20 text-white">
		<nav class="w-full portrait:h-[10vh] landscape:h-[20vh] grid grid-cols-12">
			<div class="col-span-3">
				<div
					on:click|preventDefault={handleCartClick}
					on:keydown|preventDefault={handleCartClick}
					class={`flex justify-center items-center h-full ${
						$uiStore.activated
							? $uiStore.shopping
								? 'opacity-100'
								: 'opacity-80'
							: 'opacity-0 -translate-y-[80px]'
					} transition-all duration-700`}
				>
					<div class="relative flex items-center">
						<CartShoppingFast class={`fill-white w-8 `} />
						{#if cart?.count}
							<div
								class={`absolute -right-[200%] rounded-full bg-pink-500 px-4 py-1 cursor-default ${
									$uiStore.shopping ? 'scale-100' : 'scale-0'
								} transition-transform duration-700`}
							>
								{cart.count}
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="col-span-6">
				<div
					on:click|preventDefault={enlargeClock}
					on:keydown|preventDefault={enlargeClock}
					class={`text-gray-500 text-center h-full flex justify-center items-center ${
						$uiStore.activated
							? $uiStore.shopping
								? 'translate-y-0 text-lg mb-2'
								: 'translate-y-[140px] text-3xl sm:text-6xl'
							: '-translate-y-[50px] text-sm'
					} transition-all duration-1000 cursor-default`}
				>
					<Clock />
				</div>
			</div>
			<div class="col-span-3">
				<div
					on:click|preventDefault={togglePower}
					on:keydown|preventDefault={togglePower}
					class={`bg-black flex justify-center items-center h-full ${
						$uiStore.activated ? 'opacity-100' : 'opacity-20'
					} transition-all duration-500`}
				>
					<PowerOff class={`fill-white w-8`} />
				</div>
			</div>
		</nav>
	</header>

	<div
		class={`${
			$uiStore.activated
				? $uiStore.shopping
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-full max-h-[80vh]'
				: 'opacity-0'
		} transition-all duration-700 portrait:h-[90vh] landscape:h-[80vh] p-2 text-white overflow-scroll`}
	>
		<slot />
	</div>

	{#if $uiStore.activated}
		<Drawer />
	{/if}
</div>
