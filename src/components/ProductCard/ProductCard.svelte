<script lang="ts">
	import type { ProductOverviewFragment$data } from '$houdini';
	import useProductStore from '$stores/product';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { EventHandler } from 'svelte/elements';

	export let product: ProductOverviewFragment$data;

	const productStore = useProductStore();

	const handleClick: EventHandler<Event> = () => {
		productStore.update((store) => ({ ...store, product }));
		drawerStore.open({ id: 'product' });
	};
</script>

<div
	class="max-w-sm border border-gray-800 object-contain rounded-lg overflow-hidden"
	on:click|preventDefault={handleClick}
	on:keydown={handleClick}
>
	<div class="flex justify-between h-28">
		<img
			src={product.image?.url}
			alt={product.image?.alt ?? ''}
			class="rounded w-24 aspect-square object-cover"
		/>
		<div class="px-2 w-full text-white flex justify-center items-center">
			<h2 class="text-center text-4xl">{product.title}</h2>
		</div>
		<div class="h-full opaciy-80 bg-pink-400 to-teal-400 justify-center flex items-center w-24">
			<p class="text-white text-xl">
				${product.price}
			</p>
		</div>
	</div>
</div>
