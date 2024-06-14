# Sample of Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

* template language: Vue 3 in TypeScript
* frontend tooling: Vite
* package management: yarn v2

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

// TODO:

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