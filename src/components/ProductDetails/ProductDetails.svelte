<script lang="ts">
	import Minus from '$icons/solid/minus.svg?component';
	import Plus from '$icons/solid/plus.svg?component';
	import CartAdd from '$icons/solid/cart-plus.svg?component';
	import useProductStore from '$stores/product';
	import { onMount } from 'svelte';
	import { AddCartItemsStore, type ProductOverviewFragment$data } from '$houdini';
	import { page } from '$app/stores';
	import type { PageData } from '../../routes/$types';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import Spinner from '$icons/solid/spinner-third.svg?component';

	const productStore = useProductStore();

	const pageData = $page.data as PageData;

	$: product = $productStore.product as ProductOverviewFragment$data;

	let shown = false;

	onMount(() => {
		shown = true;
	});

	let quantity = 1;

	const handleIncrement = (action: 'plus' | 'minus') => {
		switch (action) {
			case 'plus':
				quantity < (product.stock ?? 0) && quantity++;
				break;

			case 'minus':
				quantity > 1 && quantity--;
				break;

			default:
				break;
		}
	};

	const addToCart = new AddCartItemsStore();

	const handleAddToCart = async () => {
		const { data } = await addToCart.mutate({ items: [{ product: product.id, quantity }] });

		pageData.GetCart.fetch();

		drawerStore.close();
	};

	$: loading = $addToCart.fetching;
</script>

<div class="flex portrait:flex-col landscape:flex-row justify-between h-full items-center mx-4">
	<div
		class={`relative rounded aspect-square  ${
			shown ? 'scale-100' : 'scale-0'
		} transition-all duration-500`}
	>
		<img
			src={product.image?.url}
			alt={product.image?.alt ?? ''}
			class={` object-contain rounded`}
		/>
		<div class="absolute -top-4 -right-4 rounded-full bg-pink-500 px-3 py-1 text-xl">
			${(product.price ?? 0) * 1}
		</div>
	</div>
	<div class="px-2 w-full h-full flex flex-col justify-around items-center">
		<h2 class="text-center text-4xl">{product.title}</h2>
		{#if product.description}
			<div class="text-center">{product.description}</div>
		{/if}
	</div>
	<div class="flex flex-col justify-between items-center h-full">
		<div class="flex gap-2">
			<div
				on:click|preventDefault={() => handleIncrement('minus')}
				on:keydown|preventDefault={() => handleIncrement('minus')}
				class="flex justify-center items-center w-full h-full"
			>
				<Minus
					class={`w-8 fill-white ${quantity < 2 ? 'opacity-20' : 'opacity-100'} transition-opacity`}
				/>
			</div>
			<input class="w-24 rounded bg-transparent text-center text-7xl" value={quantity} disabled />
			<div
				on:click|preventDefault={() => handleIncrement('plus')}
				on:keydown|preventDefault={() => handleIncrement('plus')}
				class="flex justify-center items-center w-full h-full"
			>
				<Plus
					class={`w-8 fill-white ${
						quantity < (product.stock ?? 0) ? 'opacity-100' : 'opacity-0'
					} transition-opacity`}
				/>
			</div>
		</div>
		<button
			class="rounded-lg px-12 py-4 bg-cyan-500 relative"
			on:click|preventDefault={handleAddToCart}
		>
			{#if loading}
				<Spinner class="w-8 fill-white animate-spin" />
			{:else}
				<CartAdd class="w-8 fill-white animate-[bounce_300ms_ease-in-out_1.5]" />
			{/if}
		</button>
	</div>
</div>
