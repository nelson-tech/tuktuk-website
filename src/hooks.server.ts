import { GQL_API_KEY } from '$env/static/private';
import { setSession } from '$houdini';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// set the session information for this event
	setSession(event, { apiKey: GQL_API_KEY });

	// pass the event onto the default handle
	return await resolve(event);
};
