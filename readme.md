# remark-excerpt

> [Remark](https://remark.js.org/) transformer for extracting an excerpt.

This is a [remark](https://remark.js.org/) plugin for transformer for extracting an excerpt, similar to [WordPress's excerpt functionality](https://kinsta.com/knowledgebase/wordpress-excerpt/).

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
import {remark} from 'remark';
import excerpt from 'remark-excerpt';
import {toVFile} from 'to-vfile';

const file = await toVFile.read('example.md');
const result = await remark().use(plugin).process(file);

console.log(result.toString());
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

##### `identifier`

Type: `String`
Default: `excerpt`, `more`, `preview`, or `teaser`

Specifies the excerpt comment identifier to look for.

## License

MIT © [Michael Novotny](https://manovotny.com)
