# lexicographic-semver

convert semver tag to lexicographically sortable string, sort, compare, validate

yes, there are many libraries that compare/sort semver versions, but I haven't found one that converts semver versions to lexicographically sortable strings, which is a convenient way to store them in sorted order in a database.

Note: this library supports a limited subset of semver versions, e.g. `1.2.3-alpha.0` is allowed but `1.2.3-alpha` is not.

## Install

```sh
npm i -S lexicographic-semver
```

## Usage

```js
const semverSort = require('lexicographic-semver')
semverSort.sortTags(['1.2.3', '1.2.1', '1.2.2-rc.0'])
// [ '1.2.1', '1.2.2-rc.0', '1.2.3' ]

semverSort.toSortableTag('v1.2.3')
// '01.02.03~'
semverSort.toSortableTag('v1.2.3-rc.0')
// '01.02.03-rc.00'
````
