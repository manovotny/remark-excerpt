const remark = require('remark');
const vfile = require('to-vfile');

const plugin = require('..');

(async () => {
    const file = await vfile.read('./example/example.md');
    const result = await remark().use(plugin).process(file);

    // eslint-disable-next-line no-console
    console.log(result.toString());
})();
