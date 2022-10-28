import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

export default [
    {
        input: 'src/index.tsx',
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        // This is a hack to workaround a warning that should be fixed
        onwarn(warning, warn) {
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            warn(warning);
        },
        plugins: [
            resolve({
                preferBuiltins: true,
                browser: true,
            }),
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify('development'),
                },
            }),
            commonjs({
                include: /node_modules/,
                requireReturnsDefault: 'auto', // <---- this solves default issue
            }),
            typescript({ tsconfig: './tsconfig.json', sourceRoot: '/src/ui' }),
            postcss({
                minimize: true,
                sourceMap: true,
                extract: 'styles.css',
            }),
            serve({
                open: true,
                openPage: '/',
                verbose: true,
                contentBase: [''],
                host: 'localhost',
                port: 3000,
            }),
            livereload({ watch: 'dist' }),
        ],
    },
];
