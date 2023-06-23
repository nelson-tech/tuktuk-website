<script lang="ts">
	import { page } from '$app/stores';
	import {
		UpdateCartItemQuantityStore,
		type CartFragment$data,
		RemoveCartItemStore,
		ClearCartStore
	} from '$houdini';
	import type { PageData } from '../../routes/$types';

	import Minus from '$icons/solid/minus.svg?component';
	import Plus from '$icons/solid/plus.svg?component';
	import TrashCan from '$icons/solid/trash-can.svg?component';
	import Spinner from '$icons/solid/spinner-third.svg?component';
	import EmptyCart from '$icons/duotone/cart-circle-xmark.svg?component';

	const updateCartItem = new UpdateCartItemQuantityStore();
	const removeCartItem = new RemoveCartItemStore();
	const clearCart = new ClearCartStore();

	const pageData = $page.data as PageData;

	$: ({ GetCart } = pageData);

	$: cart = $GetCart?.data?.getCart;

	$: items = cart?.items;

	$: loading =
		$GetCart.fetching ||
		$updateCartItem.fetching ||
		$removeCartItem.fetching ||
		$clearCart.fetching;

	type ItemType = Exclude<CartFragment$data['items'], null>[0];

	const handleIncrement = async (action: 'plus' | 'minus', item: ItemType) => {
		if (item.product?.id && item.quantity) {
			await updateCartItem.mutate({
				product: item.product.id,
				quantity: item.quantity + (action === 'plus' ? 1 : -1)
			});
		}
	};

	const handleRemoveItem = async (item: ItemType) => {
		if (item.product?.id) {
			await removeCartItem.mutate({ product: item.product.id });
		}
	};

	const handleClearCart = async () => {
		await clearCart.mutate(null);
	};
</script>

<div class="flex portrait:flex-col landscape:flex-row justify-between h-full items-center">
	<div>
		{#if items}
			{#each items as item}
				<div class="max-w-sm border border-gray-800 object-contain rounded-lg overflow-hidden">
					<div class="flex justify-between h-16">
						<img
							src={item.product?.image?.url}
							alt={item.product?.image?.alt ?? ''}
							class="rounded w-16 aspect-square object-cover"
						/>
						<div class="px-2 w-full text-white flex flex-col justify-center items-center">
							<h2 class="text-center text-xl">{item.product?.title}</h2>
							<div class="flex">
								<div
									on:click|preventDefault={() => handleIncrement('minus', item)}
									on:keydown|preventDefault={() => handleIncrement('minus', item)}
									class="flex justify-center items-center w-full h-full px-2"
								>
									<Minus
										class={`w-2 fill-white ${
											(item.quantity ?? 0) < 2 ? 'opacity-0' : 'opacity-100'
										} transition-opacity`}
									/>
								</div>
								<input
									class="w-8 rounded bg-transparent text-center text-lg"
									value={item.quantity}
									disabled
								/>
								<div
									on:click|preventDefault={() => handleIncrement('plus', item)}
									on:keydown|preventDefault={() => handleIncrement('plus', item)}
									class="flex justify-center items-center w-full h-full px-2"
								>
									<Plus
										class={`w-2 fill-white ${
											(item.quantity ?? 0) < (item.product?.stock ?? 0)
												? 'opacity-100'
												: 'opacity-0'
										} transition-opacity`}
									/>
								</div>
							</div>
						</div>
						<div
							class="flex justify-center items-center px-4"
							on:click|preventDefault={() => handleRemoveItem(item)}
							on:keydown|preventDefault={() => handleRemoveItem(item)}
						>
							<TrashCan class="w-4 fill-red-500" />
						</div>
						<div
							class="h-full opaciy-80 bg-pink-400 to-teal-400 justify-center flex items-center w-24"
						>
							<p class="text-white text-xl">
								${(item.product?.price ?? 0) * (item.quantity ?? 1)}
							</p>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
	<div class="flex flex-col justify-between items-center">
		<button class="px-8 py-4 bg-pink-500 rounded-lg self-end text-4xl" disabled={loading}>
			{#if loading}
				<Spinner class=" animate-spin w-10 mx-[47px] my-0.5 fill-white" />
			{:else}Pay ${cart?.total}
			{/if}</button
		>
		<div
			class="mt-8"
			on:click|preventDefault={handleClearCart}
			on:keydown|preventDefault={handleClearCart}
		>
			<EmptyCart class="w-16 p-2 fill-white [&_path]:!opacity-80 [&_.fa-primary]:fill-red-500" />
		</div>
	</div>
</div>
