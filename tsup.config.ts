import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.tsx'],
    dts: true,
    format: ['cjs', 'esm'],
    publicDir: 'src/schema',
    esbuildOptions(options, context) {
        options.assetNames = 'schema/[name]'
    },
});