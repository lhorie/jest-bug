const isBrowser = require('is-browser');

test('browser', () => {
  expect(isBrowser).toEqual(true);
});
