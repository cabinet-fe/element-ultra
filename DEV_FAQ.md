# DEV FAQ

Here are the problems that are easy to encounter in development.

## If you encounter dependency related issues

```bash
pnpm i
```

## Link local dependencies

```bash
# get dist
pnpm build
cd dist/element-ultra
# set cur element-ultra to global `node_modules`
pnpm link --global
# for esm we also need link element-ultra for dist
pnpm link --global element-ultra

# go to your project, link to `element-ultra`
cd your-project
pnpm link --global element-ultra
```

> More info see [pnpm link](https://pnpm.io/cli/link).

## Theme

We should not write Chinese comments in scss files.

It will generate warning `@charset "UTF-8";` in the header of css file when built with vite.

> More info see [#3219](https://github.com/element-ultra/element-ultra/issues/3219).
