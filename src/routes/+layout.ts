import { load_GetCart, load_GetProducts } from '$houdini';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	return { ...(await load_GetProducts({ event })), ...(await load_GetCart({ event })) };
};
