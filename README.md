# Sample of Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

* template language: Vue 3 in TypeScript
* frontend tooling: Vite
* package management: yarn v2
* linter: ESLint
* formatter: Prettier
* internationalization: i18n
* component library: Element Plus (Element UI for Vue 3)
* css framework: Tailwind CSS
* vue store framework: Pinia
* ajax client: Axios HTTP
* api mocking library: Mirage JS
* router framework: Vue Router (vue-router)
* event emitter: mitt (Event Bus - which is included in the `vue` is removed since Vue 3)

## Description

An in-depth paragraph about your project and overview of use.

## Prerequisites

* node, npm: *
* yarn: *
* recommended VSCode extensions:
  * Vue - Official
  * JavaScript and TypeScript Nightly

## Getting Started

### Install

```
# bash
yarn install
```

### Quick Start

```
# bash
yarn run dev
```

### Project Structure

// TODO:

## Development

### Develop

// TODO:

### Lint

```
# bash
yarn run lint
```

### Test

// TODO:

## Create a Vue project with an existing empty GitHub repo step by step

### yarn v2
* git clone the empty repo
* run `yarn create vite ./ --template vue-ts` under project root folder and init vue with existing files
* run `yarn set version latest`
* edit `.gitignore` according to [yarn-gitignore](https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)
* run `yarn add --dev typescript` to install typescript as a development dependency for the project
* add `nodeLinker: node-modules` in `.yarnrc.yml` to disable pnp and add `node_modules` in `.gitignore`
* add `src/*.js`and `src/*.d.ts` in `.gitignore`
* run `yarn install`

### ESLint and Prettier
* run `yarn add -D eslint eslint-plugin-vue`
* add eslint config file `eslint.config.js` by `yarn eslint --init`
* run `yarn add -D vue-eslint-parser @typescript-eslint/parser`
* config `eslint.config.js` according to [eslint configurations](https://eslint.org/docs/latest/use/configure/configuration-files) and [eslint-plugin-vue configurations](https://eslint.vuejs.org/user-guide/#configuration-eslint-config-js)
* run `yarn add -D prettier eslint-plugin-prettier eslint-config-prettier`
* config `eslint.config.js` according to [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) and  [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
* add `lint` script in `package.json` to run `eslint`
* TODO: add `eslint-plugin-import` [[Feature Request] Support new ESLint flat config](https://github.com/import-js/eslint-plugin-import/issues/2556)

### i18n
* run `yarn add vue-i18n`
* add and config `i18n` according to [vue-i18n configurations](https://vue-i18n.intlify.dev/guide/installation.html)
* add locale json files for supported languages in `src/assets`

### Element Plus
* run `yarn add element-plus @element-plus/icons-vue @vueuse/core`
* run `yarn add -D sass`
* config `Element Plus` according to [Element Plus Quick Start](https://element-plus.org/en-US/guide/quickstart.html)
* config `Element Plus Icons` according to [Element Plus Icons Configurations](https://element-plus.org/en-US/component/icon.html)
* config `Dark Mode` according to [Dark Mode](https://element-plus.org/en-US/guide/dark-mode.html)

### Tailwind CSS
* run `yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest`
* run `yarn tailwindcss init -p`
* config `Tailwind CSS` according to [Install Tailwind CSS with Vue 3 and Vite](https://v2.tailwindcss.com/docs/guides/vue-3-vite)
* add `typography` settings if necessary
  * run `yarn add -D @tailwindcss/typography`
  * add `@tailwindcss/typography` in `tailwind.config.js` plugins for font configurations [Plugin Configurations](https://v2.tailwindcss.com/docs/configuration#plugins)

### Pinia
* run `yarn add pinia`
* config `pinia` according to [Getting Started](https://pinia.vuejs.org/getting-started.html)

### Axios
* run `yarn add axios`
* config `axios` clients accoding to [Getting Started](https://axios-http.com/docs/intro)

### Mirage JS
* run `yarn add --dev miragejs`
* add a `server` folder in the `src` folder to config `migragejs` to mock backend server according to [Introduction](https://miragejs.com/docs/getting-started/introduction/)
* implement api mocking then config models and routes in the mocked server
* hint: use `as any` to convert `schema` as type `any` to avoid annoying declarations

### vue-router
* run `yarn add vue-router`
* config routes and router view according to [Getting Started](https://router.vuejs.org/guide/). recommand to add a `routes` folder in the `src` folder to configure a `router`

### mitt
* `mitt` and `tiny-emitter` are suggested by `vue` to implement the Event Bus pattern in Vue 3. [Implement Event Bus in Vue 3](https://v3-migration.vuejs.org/breaking-changes/events-api#event-bus)
* run `yarn add mitt`
* provide  `emitter` in vue app and inject it in the components. [Provide / Inject](https://v3-migration.vuejs.org/breaking-changes/global-api#provide-inject)

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [vue-element-plus-admin](https://github.com/kailong321200875/vue-element-plus-admin)
