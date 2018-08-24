const isBrowser = require('is-browser');

test('node', () => {
  expect(isBrowser).toEqual(false);
});
