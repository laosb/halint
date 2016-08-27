# 🐸 HaLint

[![Build Status](https://travis-ci.org/laosb/halint.svg?branch=master)](https://travis-ci.org/laosb/halint)

HaLint, aka wright, is a simple language linter mainly for Chinese. And it can also check your source file format(Markdown, etc.).

## Usage

```sh
npm i halint --save
```

```javascript
import halint from 'halint';
const fileContent = '你们有一个好，全世界甚么地方，你们跑得最快，但是问来问去的问题呀，too simple，sometimes naive，懂得没有？';
const rules = { syntax: {}, lang: {
  'space-between-han-west': true,
  'avoid-curly-quotes': true,
  'avoid-conjuncted-spaces': true,
  'prefer-full-punctuations': true,
} };

halint(fileContent, 'zh_cn', 'plain', rules);
```

Full documentation coming soon.

## Upgrading from wright

Remove your `wright-core` install and install `halint` instead.

If you use the `halint.b.min.js`, there should be no change except use `halint` instead of `wright`.

If you `import` from this package, you won't need to change anything. But we suggest using the new name in your code. If so, please don't forget to change `wright` into `halint` as stated in Usage above. You'll need to replace all `wright()` calls to `halint()`, too.

## Contributing

### Build locally

#### Node (Normal Environment)

`npm run build`, and you'll see the Babel-compiled files in `dist/`.

#### Browser

`npm run build && npm run build-browser`, `dist/halint.b.js` is the browser bundle.

To minify, use `npm run browser-minify` then.

You'll need to load `underscore` before the browser bundle, as we just have a shim to load it from `window`. So `lodash` may also works with `wright` as we just use `window._`.

### Running tests

Build first, and then `npm test`.

### Code linting

`npm run lint` powered by ESLint. Please ensure that your code is linting-error/warnings-free before submitting a PR.

## License

MIT
