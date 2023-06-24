import { load_GetCart, load_GetProducts } from '$houdini';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	const productsPromise = await load_GetProducts({ event });
	const cartPromise = await load_GetCart({ event });
	const [productsStore, cartStore] = await Promise.all([productsPromise, cartPromise]);
	return { ...productsStore, ...cartStore };
};
