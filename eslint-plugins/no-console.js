module.exports = {
  create(context) {
    return {
      CallExpression: node => {
        if (!isMember(node.callee)) {
          return;
        }
        // check if MemberExpression is `console`
        const isConsole =
          isIdentifier(node.callee.object) &&
          node.callee.object.name === 'console';
        if (!isConsole) {
          return;
        }
        const property = node.callee.property;
        if (isIdentifier(property)) {
          const name = property.name;
          if (['warn', 'info', 'log'].indexOf(name) > -1) {
            context.report(node, 'Using console is not allowed');
          }
        }
      },
    };
  },
};

function isIdentifier(node) {
  return node.type === 'Identifier';
}

function isMember(node) {
  return node.type === 'MemberExpression';
}
