### Documentação para iniciar o back-end da aplicação.

#### Criar o repositório.
~~~bash
git init

touch .gitignore README.md

mkdir .vscode dist src
~~~

#### Commond git.
~~~
git add --all

git commit -m 'commentary'

git push origin master
~~~

#### .editorconfig
~~~.editorconfig
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
~~~

#### .vscode and settings.json
~~~json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
}
~~~

#### Init project Node
~~~bash
yarn init -y or yarn init
~~~

#### Install Typescript and tscconfig.json
~~~bash
yarn add --dev typescript

yarn tsc --init

yarn add -D ts-node-dev tsconfig-paths @types/node
~~~
tsconfig.json
~~~ts
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib": ["ES6"],
    "allowJs": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    "baseUrl": ".",
    "paths": {
      "@config/*": [
        "./src/config/*"
      ],
      "@controllers/*": [
        "./src/controllers/*"
      ],
      "@database/*": [
        "./src/database/*"
      ],
      "@middleware/*": [
        "./src/middleware/*"
      ],
      "@repository/*": [
        "./src/repository/*"
      ],
      "@routes/*": [
        "./src/routes/*"
      ],
      "@services/*": [
        "./src/services/*"
      ]
    },
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
~~~
#### ts-node-dev script dev.
~~~txt
--respawn -- finaliza todos os processos toda  vez que o servidor da um restart.
--transpile-only -- ira so transpilar o arquivos sem check de tipagem, usamos o eslint pras verificações.
--ignore-watch <filepath>  -- n~ao ira ficar manitorando o arquivo.
--no-notify não ira ficar notificando toda vez que o servidor reiniciar.
~~~
~~~json
"dev": "ts-node-dev --require tsconfig-paths/register --respawn --transpile-only  --ignore-watch node_modules --no-notify ./src/services/server.ts",
~~~

#### Install Prettier and .prettierrc.js
~~~bash
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier
~~~
.prettierrc.js
~~~js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
}
~~~
#### Install Eslint and .eslintrc.js .eslintignore
~~~bash
yarn add --dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import

yarn eslint --init
~~~
~~~js
module.exports = {
  env: {
    es2017: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
  },
};
~~~
.eslintignore
~~~.eslintignore
dist

node_modules
~~~

#### Install Babel and babel.config.js
~~~bash
yarn add --dev babel @babel/cli @babel/core @babel/node @babel/preset-end @babel/preset-typescript babel-plugin-module-resolver
~~~
babel.config.js
~~~js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@models': './src/models',
          '@controllers': './src/controllers',
          '@middleware': './src/middeware',
          '@database': './src/database',
          '@repository': './src/repository',
          '@routes': './src/routes',
          '@services': './src/services',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
~~~
##### Build Script Babel
~~~js
--extension      = qual são os aquivos que seram compilados
--out-dir        = diretorio de saída
--copy-files     = copiar os arquivos e coloca na pasta de saída mesmo não sendo .js ou .ts, podendo ser html, etc...
--no-copy-ignore = não copiar os arquivos que definimos no ignore: ['**/*.spec.ts'] do babel.config.js

"scripts": {
  "build": "babel src --extensions \".js,.ts\" --out-dir dist  --copy-files --no-copy-ignore"
}
~~~

#### Install Typeorm, .env and ormconfing.js
~~~bash
yarn add typeorm pg reflect-metadata uuidv4 dotenv && yarn add -D @types/dotenv
~~~
.env
~~~env
DATABASE_URL = postgres://postgres:root@localhost:5432/task
TYPEORM_ENTITIES = src/models/**/*.ts
TYPEORM_MIGRATIONS = src/database/migrations/**/*.ts
TYPEORM_SUBESCRIBERS = src/subscribers/**/*.ts
TYPEORM_ENTITIES_DIR = src/models
TYPEORM_MIGRATIONS_DIR = src/database/migrations
TYPEORM_SUBESCRIBERS_DIR = src/subscribers
~~~
ormconfig.js
~~~js
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES || 'dist/models/**/*.js'],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'dist/database/migrations/**/*.js',
  ],
  subcribers: [process.env.TYPEORM_SUBCRIBERS || 'dist/subcribers/**/*.js'],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    subscribersDir: process.env.TYPEORM_SUBESCRIBERS_DIR,
  },
};
~~~
##### loader variable env.ts
~~~
...
  |-- src
    |-- config
      |-- env.ts
~~~
~~~ts
import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve(__dirname, '..', '..', '.env'),
});
~~~
##### Create Connection
~~~
...
  |-- src
    |-- database
      |-- index.ts
~~~
~~~ts
import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default (async () => {
  return createConnection();
})();
~~~
##### Script typeorm in package.json
~~~json
"scripts": {
     "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config ./ormconfig.js ",
}
~~~
##### Typeorm CLI
~~~
--rodar migrations
yarn typeorm migration:run

--criar uma migration
yarn typeorm migration:create -- -n createUser

--gerar migrations a partir das model
yarn typeorm migration:generate -- -n createUser

--reverte uma magration
yarn typeorm migration:revert


--criar uma model
yarn typeorm entity:create -- -n User
~~~
#### Folder Structure
~~~
My Project
...
  |-- .vscode
    |-- settings.json
  |-- dist
  |-- node_modules
  |-- src
    |-- config
    |-- controllers
    |-- database
      |-- migrations
    |-- models
    |-- repository
    |-- routes
    |-- services
  |-- .editorconfig
  |-- .eslintignore
  |-- .eslintrc.js
  |-- .gitattributes
  |-- .gitignore
  |-- .prettier.js
  |-- babel.config.js
  |-- ormconfig.json
  |-- package.json
  |-- README.md
  |-- tsconfig.json
~~~

