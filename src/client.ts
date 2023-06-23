import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'http://localhost:8647/api/graphql',
	fetchParams({ session }) {
		console.log('Session');

		return {
			headers: {
				Authorization: `users API-Key ${session?.apiKey}`
			}
		};
	}

	// uncomment this to configure the network call (for things like authentication)
	// for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
	// fetchParams({ session }) {
	//     return {
	//         headers: {
	//             Authentication: `Bearer ${session.token}`,
	//         }
	//     }
	// }
});