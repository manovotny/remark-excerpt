# remark-excerpt

> [Remark](https://remark.js.org/) transformer for extracting an excerpt.

This is a [remark](https://remark.js.org/) plugin for transformer for extracting an excerpt, like [WordPress's excerpt functionality](https://kinsta.com/knowledgebase/wordpress-excerpt/).

## Installation

### NPM

```
$ npm i remark-excerpt
```

### Yarn

```
$ yarn add remark-excerpt
```

## Usage

Say we have the following file, `example.md`:

```
# Title

Paragraph 1.

Paragraph 2.

<!-- excerpt -->

Paragraph 3.

Paragraph 4.
```

And our script, `example.js`, looks as follows:

```js
const remark = require('remark');
const excerpt = require('remark-excerpt');
const vfile = require('to-vfile');

(async () => {
    const file = await vfile.read('example.md');
    const result = await remark()
        .use(excerpt)
        .process(file);

    console.log(result.toString());
})();
```

Now, running `node example` yields:

```
# Title

Paragraph 1.

Paragraph 2.
```

You can try this yourself by downloading or cloning the project, installing dependencies, and running `yarn example`.

## API

### `remark().use(excerpt[, options])`

Returns markdown content specified before the excerpt comment.

#### Options

##### `keyword`

Type: `String`
Default: `excerpt`, `more`, or `preview`

Specifies the excerpt comment keyword to look for.

## License

MIT © [Michael Novotny](https://manovotny.com)
