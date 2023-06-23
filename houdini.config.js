/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'http://localhost:8647/api/graphql'
	},
	plugins: {
		'houdini-svelte': {}
	},
	defaultFragmentMasking: 'disable'
};

export default config;
