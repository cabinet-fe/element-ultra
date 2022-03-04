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
cd dist/element-pro
# set cur element-pro to global `node_modules`
pnpm link --global
# for esm we also need link element-pro for dist
pnpm link --global element-pro

# go to your project, link to `element-pro`
cd your-project
pnpm link --global element-pro
```

> More info see [pnpm link](https://pnpm.io/cli/link).

## Theme

We should not write Chinese comments in scss files.

It will generate warning `@charset "UTF-8";` in the header of css file when built with vite.

> More info see [#3219](https://github.com/element-pro/element-pro/issues/3219).
