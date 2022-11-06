import {remark} from 'remark';
import {toVFile} from 'to-vfile';

import plugin from '../index.js';

// (async () => {
const file = await toVFile.read('./example/example.md');
const result = await remark().use(plugin).process(file);

// eslint-disable-next-line no-console
console.log(result.toString());
// })();
