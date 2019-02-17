const {join} = require('path');

const {wrap} = require('jest-snapshot-serializer-raw');
const remark = require('remark');
const vfile = require('to-vfile');

const plugin = require('../index');

const processFixture = async (name, options) => {
    const path = join(__dirname, 'fixtures', name);
    const file = await vfile.read(path);
    const result = await remark()
        .use(plugin, options)
        .process(file);

    return result.toString();
};

test('should return unmodified document when no excerpt exists', async () => {
    const result = await processFixture('no-excerpt.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "exceprt" keyword', async () => {
    const result = await processFixture('excerpt.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "more" keyword', async () => {
    const result = await processFixture('more.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "preview" keyword', async () => {
    const result = await processFixture('preview.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using custom keyword', async () => {
    const options = {
        keyword: 'custom'
    };
    const result = await processFixture('custom.md', options);

    expect(wrap(result)).toMatchSnapshot();
});

test('should return after excerpt when multiple exist', async () => {
    const result = await processFixture('multiple.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should handle no spacing in exceprt comment', async () => {
    const result = await processFixture('no-space-in-comment.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should handle mdx', async () => {
    const result = await processFixture('mdx.mdx');

    expect(wrap(result)).toMatchSnapshot();
});
