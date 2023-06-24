/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: `${'env:PUBLIC_API_URL'}/api/graphql`
	},
	plugins: {
		'houdini-svelte': {}
	},
	defaultFragmentMasking: 'disable'
};

export default config;
