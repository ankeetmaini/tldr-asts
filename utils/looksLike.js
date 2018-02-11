module.exports = function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const aVal = a[bKey];
      const bVal = b[bKey];
      if (typeof bVal === 'function') {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
};

function isPrimitive(val) {
  return Object.prototype.toString.call(val) !== '[object Object]';
}
