// copied from https://www.npmjs.com/package/compare-versions

const test = require('tape')
const compare = require('..').compareTags
const cmp = {
  '1':  '>',
  '0':  '=',
  '-1': '<',
}

test('three-segment versions', t => {
  [
    // basic
    ['10.1.8', '10.0.4', 1],
    ['10.0.1', '10.0.1', 0],
    ['10.1.1', '10.2.2', -1],
    // diff nums of digits per group
    ['11.0.10', '11.0.2', 1],
    ['11.0.2', '11.0.10', -1],
    // prerelease versions
    ['1.0.0-beta.2', '1.0.0-beta.11', -1],
    ['1.0.0-beta.11', '1.0.0-rc.1', -1],
    ['1.0.0-rc.1', '1.0.0', -1],
  ].forEach(([v1, v2, expected]) => {
    t.equal(compare(v1, v2), expected, `${v1} ${cmp[expected]} ${v2}`)
  })

  t.end()
})
