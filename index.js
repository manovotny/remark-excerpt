const visit = require('unist-util-visit');

const isComment = /<!--(.*?)-->/u;
const getComment = /<!--([\s\S]*?)-->/u;

const plugin = (options = {}) => {
    const transformer = (tree) => {
        const excerpts =
            options.identifier && options.identifier.length
                ? [options.identifier]
                : ['excerpt', 'more', 'preview', 'teaser'];

        let excerptIndex = -1;

        visit(tree, 'html', (node) => {
            if (excerptIndex === -1 && isComment.test(node.value)) {
                const comment = getComment.exec(node.value);

                if (comment) {
                    const text = comment[1].trim();

                    if (excerpts.includes(text)) {
                        excerptIndex = tree.children.indexOf(node);
                    }
                }
            }
        });

        if (excerptIndex > -1) {
            tree.children.splice(excerptIndex);
        }
    };

    return transformer;
};

module.exports = plugin;
