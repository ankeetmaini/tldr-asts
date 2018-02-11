import looksLike from '../utils/looksLike';

const disallowedMethods = ['warn', 'log', 'info'];

module.exports = {
  create(context) {
    return {
      Identifier(node) {
        const isConsole = looksLike(node, {
          name: 'console',
          parent: {
            type: 'MemberExpression',
            parent: {
              type: 'CallExpression',
            },
            property: {
              name: val => disallowedMethods.includes(val),
            },
          },
        });
        if (isConsole) {
          context.report(node, 'No console allowed');
        }
      },
    };
  },
};
