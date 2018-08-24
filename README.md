# Jest browser field concurrency bug

This repo demonstrates a bug where running Jest causes tests to break incorrectly if the following conditions are met:

- Jest is configured to use two `projects` or more
  - one project has `browser` field set to `true`
  - one project has `browser` field set to `false`
- Tests consume a package whose package.json file contains both `main` and `browser` fields
- Tests are run concurrently (e.g. if there are more than 20 tests)

### Reproduction steps

```sh
yarn # install

yarn test # fails

yarn test browser # passes
yarn test node # passes
yarn test a # passes
```

### Expected behavior

```sh
yarn test # should pass
```

### Actual behavior

```
yarn test
yarn run v1.7.0
$ jest
 PASS   node  __tests__/a.node.js
 PASS   node  __tests__/g.node.js
 PASS   node  __tests__/i.node.js
 PASS   node  __tests__/k.node.js
 PASS   node  __tests__/h.node.js
 PASS   node  __tests__/f.node.js
 PASS   node  __tests__/e.node.js
 PASS   node  __tests__/j.node.js
 PASS   node  __tests__/d.node.js
 PASS   node  __tests__/c.node.js
 PASS   node  __tests__/b.node.js
 FAIL   browser  __tests__/b.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/b.browser.js:4:21)

 FAIL   browser  __tests__/j.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/j.browser.js:4:21)

 FAIL   browser  __tests__/h.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/h.browser.js:4:21)

 FAIL   browser  __tests__/k.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/k.browser.js:4:21)

 FAIL   browser  __tests__/i.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/i.browser.js:4:21)

 FAIL   browser  __tests__/f.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/f.browser.js:4:21)

 FAIL   browser  __tests__/e.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/e.browser.js:4:21)

 FAIL   browser  __tests__/d.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/d.browser.js:4:21)

 FAIL   browser  __tests__/c.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/c.browser.js:4:21)

 FAIL   browser  __tests__/a.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/a.browser.js:4:21)

 FAIL   browser  __tests__/g.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/g.browser.js:4:21)

Summary of all failing tests
 FAIL  __tests__/b.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/b.browser.js:4:21)

 FAIL  __tests__/j.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/j.browser.js:4:21)

 FAIL  __tests__/h.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/h.browser.js:4:21)

 FAIL  __tests__/k.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/k.browser.js:4:21)

 FAIL  __tests__/i.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/i.browser.js:4:21)

 FAIL  __tests__/f.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/f.browser.js:4:21)

 FAIL  __tests__/e.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/e.browser.js:4:21)

 FAIL  __tests__/d.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/d.browser.js:4:21)

 FAIL  __tests__/c.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/c.browser.js:4:21)

 FAIL  __tests__/a.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/a.browser.js:4:21)

 FAIL  __tests__/g.browser.js
  ● browser

    expect(received).toEqual(expected)

    Expected value to equal:
      true
    Received:
      false

      2 |
      3 | test('browser', () => {
    > 4 |   expect(isBrowser).toEqual(true);
        |                     ^
      5 | });
      6 |

      at Object.toEqual (__tests__/g.browser.js:4:21)


Test Suites: 11 failed, 11 passed, 22 total
Tests:       11 failed, 11 passed, 22 total
Snapshots:   0 total
Time:        2.63s
Ran all test suites in 2 projects.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
