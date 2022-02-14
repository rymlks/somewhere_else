import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		input: 'js/index.js',
		plugins: [
		  resolve(),
		  commonjs(),
		  babel({
			exclude: 'node_modules/**'
		  })
		],
		output: [
			{
				format: 'esm',
				file: 'build/itch.io/js/index.js',
				indent: '\t'
			}
		]
	}
];
