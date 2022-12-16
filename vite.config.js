import { sveltekit } from '@sveltejs/kit/vite';



/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
        sveltekit(),
    ],
    optimizeDeps: {
        include: ['@carbon/charts-svelte', '@carbon/charts']
    },
};

export default config;
