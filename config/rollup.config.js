/* eslint-disable node/no-unsupported-features/es-syntax */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import progress from 'rollup-plugin-progress';
import sass from 'rollup-plugin-sass';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'build',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    progress({clearLine: false}),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      exclude: [
        'src/jest.setup.ts',
        'src/AppFixture.tsx',
        '**/*.test.*',
        '**/*.fixture.*',
      ],
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
