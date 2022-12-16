import replace from '@rollup/plugin-replace';

export default {
	// ...
	plugins: [
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
};