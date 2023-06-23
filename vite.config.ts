import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
	plugins: [
		houdini(),
		sveltekit(),
		svg({
			includePaths: ['./src/lib/icons/', './src/assets/icons/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						// by default svgo removes the viewBox which prevents svg icons from scaling
						// not a good idea! https://github.com/svg/svgo/pull/1461
						params: { overrides: { removeViewBox: false } }
					},
					{ name: 'removeAttrs', params: { attrs: '(fill|stroke)' } }
				]
			}
		})
	],
	server: { port: Number.parseInt(process.env.PORT ?? '4444') }
});
