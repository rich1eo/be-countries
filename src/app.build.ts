await Bun.build({
  entrypoints: ['./src/app.ts'],
  outdir: './dist',
  env: 'inline',
  target: 'node',
  format: 'esm',
})
