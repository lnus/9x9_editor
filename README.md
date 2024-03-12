# 9x9 Editor

For-fun project that allows editing of pastes from [9x9](https://reddit.com/r/9x9).

Essentially, allows editing of pastes from the Building Gadgets mod.

## Bugs to fix

- Multiple of items of the same type creates unexpected behaviour
- ~~The last edit of an item, for some reason doesn't encode and save properly~~ Fixed!

## TODO List

- [ ] Create a coherent design for the website
- [ ] Add support for editing the header
- [ ] Add support for 1.20.* version of the mod
- [ ] Add support for 1.12.* version of the mod
- [ ] Add paste sharing
- [ ] Add paste saving (kinda the same as above)
- [ ] Paste preview (This will be really really tricky I think)
- [ ] Add better UX for uploading pastes


# Build Instructions (Mantine + Vite template)

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
