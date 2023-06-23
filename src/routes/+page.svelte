<script lang="ts">
	import ProductCart from '$components/ProductCard';
	import { GetProductsStore } from '$houdini';
	import type { PageData } from './$types';

	// const products = [
	// 	{
	// 		name: 'Energy Shot',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 3,
	// 		stock: 12
	// 	},
	// 	{
	// 		name: 'LaCroix',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 3,
	// 		stock: 8
	// 	},
	// 	{
	// 		name: 'Coke Zero',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 2,
	// 		stock: 8
	// 	},
	// 	{
	// 		name: 'Water',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 2,
	// 		stock: 8
	// 	},
	// 	{
	// 		name: 'Energy Shot',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 3,
	// 		stock: 8
	// 	},
	// 	{
	// 		name: 'Energy Shot',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 3,
	// 		stock: 8
	// 	},
	// 	{
	// 		name: 'Energy Shot',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 3,
	// 		stock: 8
	// 	},
	// 	{
	// 		name: 'Energy Shot',
	// 		image: { url: '/images/products/energy-shot.jpeg', alt: 'energy-shot' },
	// 		shortDescription: '',
	// 		description: '',
	// 		price: 3,
	// 		stock: 8
	// 	}
	// ];

	// $: product = products[0];

	export let data: PageData;

	const productsStore = new GetProductsStore();

	$: ({ GetProducts } = data);
	$: products = $GetProducts.data?.Products?.docs;
</script>

<div class="flex flex-col justify-between h-full">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
		{#if products}
			{#each products as product}
				{#if product}
					<ProductCart {product} />
				{/if}
			{/each}
		{:else}
			<!-- else content here -->
		{/if}
	</div>
</div>
