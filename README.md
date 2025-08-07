# Sample of Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

* template language: [Vue 3](https://vuejs.org/) in [TypeScript](https://www.typescriptlang.org/)
* frontend tooling: [Vite](https://vitejs.dev/)
* package management: [yarn](https://yarnpkg.com/) v2
* linter: [ESLint](https://eslint.org/)
* formatter: [Prettier](https://prettier.io/)
* internationalization: i18n [vue-i18n](https://vue-i18n.intlify.dev/)
* component library: [Element Plus](https://element-plus.org/en-US/) (Element UI for Vue 3)
* css framework: [Tailwind CSS](https://tailwindcss.com/)
* vue store framework: [Pinia](https://pinia.vuejs.org/)
* ajax client: [Axios HTTP](https://axios-http.com/)
* api mocking library: [Mirage JS](https://miragejs.com/)
* router framework: [Vue Router](https://router.vuejs.org/) (vue-router)
* event emitter: [mitt](https://github.com/developit/mitt) (Event Bus - which is included in the `vue` - is removed since Vue 3)
* logger framework: [loglevel](https://github.com/pimterry/loglevel) with plugin [loglevel-plugin-prefix](https://github.com/kutuluk/loglevel-plugin-prefix)
* unit test: [Jest](https://jestjs.io/) with [Vue Test Utils](https://test-utils.vuejs.org/)
* e2e test: [Playwright](https://playwright.dev/)
* ci workflow: [GitHub Actions](https://docs.github.com/en/actions)
* aws command line interface: [AWS CLI](https://aws.amazon.com/cli/)
* aws infrastructure framework: [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) with `python` and `pipenv`
* sensitive environment variable management: [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) and [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

## Description

A sample project of Vue 3 + Vite + TypeScript with a step-by-step guide to create and integrate with necessary libraries.

## Prerequisites

* node: 22+
* npm: *
* yarn: *
* aws cli: v2
* python: 3.9
* pip: *
* pipenv: *
* recommended VSCode extensions:
  * Vue - Official
  * JavaScript and TypeScript Nightly
  * Python
  * autoDocstring - Python Docstring Generator

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

```
project
├── .github/workflows # github actions for ci
├── .yarn # yarn package management
├── docs # documentation
├── infra # infrastracture as code
|    ├── buildspecs # aws codebuild buildspec files to run in codebuild projects as actions in codepipelines
|    ├── scripts # helper scripts
|    ├── src # aws cdk python source files
|    ├── tests # test cases
|    ├── .env.* # env variable files
|    ├── .gitignore # git ignore configs for the aws cdk project
|    ├── .pep8 # config for autopep8, a python formatter
|    ├── .pylintrc # config for pylint, a python linter
|    ├── cdk.json # cdk configs
|    ├── package-lock.json # npm package management, to manage aws cdk as a local dependency
|    ├── package.json # npm package management, to manage aws cdk as a local dependency
|    ├── Pipfile # python package management, to manage dependencies of the cdk project
|    ├── Pipfile.lock # python package management, to manage dependencies of the cdk project
|    ├── pytest.ini # pytest configs
|    ├── README.md
|    ├── requirements-dev.txt # exported requirements file with dev dependencies
|    └── requirements.txt # exported requirements file without dev dependencies
├── public # public static resources of the frontend
├── src
|    ├── apis # api clients based on axois
|    ├── assets # resources
|    |    └── locales # i18n text resources
|    ├── components
|    ├── constants
|    ├── hooks # customized reactive hooks
|    ├── routes # for vue-router
|    ├── server # for api mocking
|    ├── stores # pinia stores, handle biz logic
|    ├── utils
|    ├── views # pages
|    ├── App.vue # root component of vue app
|    ├── debug.ts # debug codes
|    ├── i18n.ts # for vue-i18n
|    ├── index.scss # root scss file
|    └── main.ts # entrance of vue
├── tests # test code folder
|    ├── unit # unit tests
|    └── e2e # e2e automated testing 
├── .env.* # env variable files
├── .gitignore
├── .yarnrc.yml # yarn config file
├── babel.config.cjs # babel config file (introduced by jest)
├── eslint.config.js # eslint config file
├── index.html # entrance html page of frontend
├── jest.config.js # eslint config file
├── package.json # package management file
├── playwright.config.ts # eslint config file
├── postcss.config.js # postcss config file (introduced by tailwind css)
├── tailwind.config.js # tailwind css config file
├── tsconfig.json # typescript config file
├── tsconfig.node.json # typescript config file
├── vite.config.ts # vite config file
├── yarn.lock # package management file
├── LICENSE.md
└── README.md
```

## Development

### Develop

* add components and page in src
* run and test

```
# bash
# run with the default development mode
yarn run dev
# run with a specified mode to apply the corresponding env file
# such as: yarn run dev --mode test, which applies `.env.test` env file
yarn run dev --mode {mode}
```

### Lint

```
# bash
yarn run lint
```

### Test

```
# bash
yarn run test:unit
yarn run test:e2e:install
yarn run test:e2e
yarn run test:e2e:report
```

### Commit/Branch Name Convention
* commit convention: check [Conventional Commits](https://www.conventionalcommits.org/) for details

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

* branch name converntion: 
  * feat/xxx
  * fix/xxx
  * docs/xxx
  * styles/xxx
  * refactor/xxx
  * chore/xxx
  * test/xxx
  * hotfix/xxx
  * releases/xxx

## CI/CD

### CI

Implement by GitHub actions.

### CD

Implement by AWS CodePipeline + AWS CodeBuild Project with AWS CloudFormation.

* source: github; need to connect github and aws manually in aws management console
* build: define resources by `aws cdk`; build cloudformation templates from defined resources by `aws cdk` in codebuild projects
* deploy: deploy cloudformation templates by codepipeline
* the cd pipeline must be manually deploy from local or by a jenkins job on jenkins server at the first time. check more details here: [Continuous integration and delivery (CI/CD) using CDK Pipelines](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html)

### Version Control
* version number: `v<major>.<minor>.<patch>`, check details in [Semantic Versioning](https://semver.org/)

## Create a Vue project with an existing empty GitHub repo step by step

### yarn v2
* git clone the empty repo
* run `yarn create vite ./ --template vue-ts` under project root folder and init vue with existing files
* run `yarn set version stable`
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

### Tailwind CSS (v2)
* run `yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest`
* run `yarn dlx tailwindcss init -p`
* config `Tailwind CSS` according to [Install Tailwind CSS with Vue 3 and Vite](https://v2.tailwindcss.com/docs/guides/vue-3-vite)
* add `typography` settings if necessary
  * run `yarn add -D @tailwindcss/typography`
  * add `@tailwindcss/typography` in `tailwind.config.js` plugins for font configurations [Plugin Configurations](https://v2.tailwindcss.com/docs/configuration#plugins)

### Tailwind CSS (v4, updated at 2025-08)
* run `yarn add -D tailwindcss @tailwindcss/vite`
* config `Tailwind CSS` according to [Installing Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)

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

### loglevel
* run `yarn add loglevel` and `yarn add loglevel-plugin-prefix`
* create a `loglevel` logger and config min log level for it according to the documentation: [Setup loglevel](https://github.com/pimterry/loglevel?tab=readme-ov-file#setting-it-up)
* config the log format by `loglevel-plugin-prefix` according to the documentation: [apply loglevel prefix](https://github.com/kutuluk/loglevel-plugin-prefix?tab=readme-ov-file#node)

### Jest
* run `yarn add -D jest jest-environment-jsdom @vue/test-utils @vue/vue3-jest ts-jest babel-jest @babel/preset-env @babel/core  babel-core@bridge`
  * `jest`: install `jest` itself
  * `jest-environment-jsdom`: allow `jest` to run in browser environment with browser objects like `document` 
  * `@vue/test-utils`: [Vue Test Utils](https://test-utils.vuejs.org/guide/) is a set of utility functions aimed to simplify testing vue components
  * `@vue/vue3-jest`: `jest` transformer for vue components
  * `ts-jest`: support typescript in `jest`
  * `babel-jest`: support using `import` instead of `require` in javascript
  * `@babel/preset-env`: support using `import` instead of `require` in javascript
  * `@babel/core`: required by `@babel/preset-env`
  * `babel-core@bridge`: required by `@vue/vue3-jest`
* add config file `jest.config.js` for `jest` and config it according to the blogs in `refs`
* add config file `babel.config.cjs` for `babel` and config it according to the blogs in `refs`
* recommended to write `jest` tests in javascript to run the tests easier
* options:
  * install `jest-transform-stub` and config stubs for resource files in `jest.config.js`
  * config mocks for dependencies
* refs
  * [Vue 3 component testing with Jest](https://blog.canopas.com/vue-3-component-testing-with-jest-8b80a8a8946b)
  * [Integrating Jest Testing into an Existing Vue 3 Project with ViteJs](https://dev.to/integridsolutions/integrating-jest-testing-into-an-existing-vue-3-project-with-vitejs-3m13)
  * [Vue 3 Starter with Vite + Typescript + Jest + ESLint + Prettier](https://github.com/santicros/vue3-vite-typescript-jest)

### Playwright
* run `yarn create playwright` to [install and config playwright](https://playwright.dev/docs/intro). It is able to add `github` actions for `playwright` at the same time
* update `playwright.config.ts` if necessary
* refs
  * [Playwright vs Puppeteer vs Cypress vs Selenium (E2E testing)](https://betterstack.com/community/comparisons/playwright-cypress-puppeteer-selenium-comparison/)

### AWS CDK
* run `mkdir infra`
* run `npx aws-cdk init app --generate-only --language=python` under `infra` folder to create the `cdk` infra project
* [optional] change `cdk` infra project structure
  * rename generated `infra` subfolder as `src` and fix related `import`
  * move `app.py` to `src` folder and edit `cdk.json` to run the moved `app.py`
  * delete `source.bat`
* use `pipenv` to manage python virtual env and dependencies instead of `venv` + `pip`
  * run `pipenv shell --python 3.9`
  * run `pipenv install -r requirements.txt`
  * run `pipenv install -d -r requirements-dev.txt`
  * run `pipenv install -d pylint` to install `pyliint` for linting `python` source code
  * run `pylint --generate-rcfile > .pylintrc` to generate `pylint` configuration file and edit it
  * run `pipenv install -d autopep8` to install `autopep8` for formatting `python` source code
  * add a `.pep8` file to configure `autopipe8`
  * fix the version of `pylint` and `autopep8` in `Pipfile`
  * upgrade `pytest` to the latest version
  * add a `pytest.ini` to configure `pytest`
  * add the `[scripts]` in `Pipfile` to implement linting and formatting `python` source code
  * run `pylint ./src` and `autopep8 --aggressive --aggressive -ivr src tests` by `pipenv shell` to fix issues
  * generate new `requirements` files from the `Pipfile.lock`
    * run `pipenv requirements > requirements.txt`
    * run `pipenv requirements --dev > requirements-dev.txt`
* manage `cdk` as a dependency instead of installing it globally
  * run `npm init` to init a `npm` project
  * run `npm install aws-cdk` to install `cdk`
  * add `"cdk": "cd $INIT_CWD && cdk"` commands in `scripts` of `package.json` to run the local `cdk`
  * edit `.gitignore` created by `cdk` to support manage `npm` project files
* update aws cli session credentials by command `aws sts get-session-token`. make sure you've configured the aws cli profile on your local. check more details here: [get-session-token](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/get-session-token.html)
* run `npm run cdk bootstrap -- --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess` to setup cdk toolkit stack. if you want to use a specified aws cdk/cli profile, add `profile` option in command, for example `npm run cdk bootstrap -- --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --profile my_profile_name`

### Sensitive Environment Variable Management
* issue and aws credentials for github to connect from github actions workflow to aws by aws cli
* add sensitive environment variables as secrets in GitHub
* add a github actions workflow to sync sensitive environment variables from github to aws ssm by aws cli, refs [GitHub Actions: Sync secrets to AWS](https://github.com/marketplace/actions/sync-secrets-to-aws)

## Help

// TODO: Any advise for common problems or issues.

## Authors

// TODO: Contributors names and contact info

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [vue-element-plus-admin](https://github.com/kailong321200875/vue-element-plus-admin)
