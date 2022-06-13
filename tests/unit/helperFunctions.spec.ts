import { getArraySample, getSortedByKey } from '@/helpers/ArrayHelpers'

describe('getArraySample', () => {
  it('Returns empty array if no input', () => {
    expect(getArraySample()).toHaveLength(0)
  })
  it('Where n = 100, return number array with length 10', () => {
    expect(
      getArraySample(
        Array.from(Array(100).keys()), 10
      )).toHaveLength(10)
  })
  it('Where n = 5, return number array with length 5', () => {
    expect(
      getArraySample(
        Array.from(Array(5).keys()), 10
      )).toHaveLength(5)
  })
  it('Where n = 0, return number array with length 0', () => {
    expect(
      getArraySample([], 10)
    ).toHaveLength(0)
  })
})

describe('getSortedListByKeyValue', () => {
  it('Returns same list if no key specified', () => {
    const sortableList: any[] = mockSortableStoryList(100)
    expect(JSON.stringify(getSortedByKey(sortableList))).toEqual(JSON.stringify(sortableList))
  })
  const sortableList: any[] = mockSortableStoryList(100)
  let previousValue: number = Number.MAX_SAFE_INTEGER
  let isSorted: boolean = true
  const sortedStoryList = getSortedByKey(sortableList, 'score')
  for (let i = 0; i < sortedStoryList.length, i++;) {
    if (previousValue < sortedStoryList[i].score) {
      isSorted = false
      return
    }
  }
  it('Returns list in descending order by key "score"', () => {
    expect(isSorted).toBe(true)
  })
})

function mockSortableStoryList(length: number = 10) {
  const list: Object[] = []
  for (let i = 0; i < length; i++) {
    list.push({
      id: (Math.floor(Math.random() * 1000)).toString(),
      score: Math.floor(Math.random() * 1000)
    })
  }
  return list
}