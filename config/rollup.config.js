/* eslint-disable node/no-unsupported-features/es-syntax */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import progress from 'rollup-plugin-progress';
import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';

const packageJson = require('../package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      name: 'BarbComponents',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      name: 'BarbComponents',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    progress({clearLine: false}),
    peerDepsExternal(),
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: [
          '**/jest.setup.ts',
          '**/AppFixture.tsx',
          '**/*.test.*',
          '**/*.fixture.*',
        ],
      },
    }),
    commonjs(),
    sass({insert: true}),
    copy({
      targets: [
        {
          src: 'src/scss/**/*.scss',
          dest: 'build/scss',
        },
      ],
    }),
  ],
};
