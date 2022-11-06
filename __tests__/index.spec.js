import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

import {wrap} from 'jest-snapshot-serializer-raw';
import {remark} from 'remark';
import {toVFile} from 'to-vfile';

import plugin from '..';

const processFixture = async (name, options) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const path = join(__dirname, 'fixtures', name);
    const file = await toVFile.read(path);
    const result = await remark().use(plugin, options).process(file);

    return result.toString();
};

test('should return unmodified document when no excerpt exists', async () => {
    const result = await processFixture('no-excerpt.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "exceprt" identifier', async () => {
    const result = await processFixture('excerpt.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "more" identifier', async () => {
    const result = await processFixture('more.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "preview" identifier', async () => {
    const result = await processFixture('preview.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using "teaser" identifier', async () => {
    const result = await processFixture('teaser.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should return excerpt using custom identifier', async () => {
    const options = {
        identifier: 'custom',
    };
    const result = await processFixture('custom.md', options);

    expect(wrap(result)).toMatchSnapshot();
});

test('should return after excerpt when multiple exist', async () => {
    const result = await processFixture('multiple.md');

    expect(wrap(result)).toMatchSnapshot();
});

test('should handle identifier with dashes', async () => {
    const options = {
        identifier: 'custom-with--dashes',
    };
    const result = await processFixture('custom-with-dashes.md', options);

    expect(wrap(result)).toMatchSnapshot();
});

test('should handle identifier with spaces', async () => {
    const options = {
        identifier: 'custom with spaces',
    };
    const result = await processFixture('custom-with-spaces.md', options);

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
