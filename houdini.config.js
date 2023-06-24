/// <references types="houdini-svelte">

import dotenv from 'dotenv';

dotenv.config();

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: `${process.env.PUBLIC_API_URL}/api/graphql`
	},
	plugins: {
		'houdini-svelte': {}
	},
	defaultFragmentMasking: 'disable'
};

export default config;
