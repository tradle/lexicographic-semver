const lexint = require('lexicographic-integer')
// e.g. '1.2.0-rc.0', '1.2.0-alpha.0', '1.2.0-trans.0'
const experimentalRegex = /-[^.]+\./
const isExperimentalTag = tag => experimentalRegex.test(tag)

const limitedSemverRegex = /^v?\d+\.\d+\.\d+(?:-[a-zA-Z]+\.\d+)?$/
const validateTag = tag => limitedSemverRegex.test(tag)

const toLexicographicInt = n => lexint.pack(n, 'hex')

const toSortableTag = tag => {
  const sortable = tag
    .replace(/^v/, '')
    .replace(/\d+/g, part => toLexicographicInt(Number(part)))

  if (isExperimentalTag(sortable)) {
    return sortable
  }

  // make sure that 1.2.0 gets sorted after 1.2.0-rc.0
  return sortable + '~'
}

const alphabetical = (a, b) => {
  if (a === b) return 0
  if (a < b) return -1
  return 1
}

const compareTags = (a, b) => {
  const as = toSortableTag(a)
  const bs = toSortableTag(b)
  return alphabetical(as, bs)
}

const sortTags = tags => tags.slice().sort(compareTags)

module.exports = {
  isExperimentalTag,
  validateTag,
  toSortableTag,
  compareTags,
  sortTags,
}
