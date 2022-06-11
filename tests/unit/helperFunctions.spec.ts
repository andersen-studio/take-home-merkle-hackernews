import { shallowMount } from '@vue/test-utils'
//import StoryList from '@/components/StoryList.vue'

function getRandomIndicesOfArray(inputArray: any[] = [], maxLength: number = 10): any[] {
  return []
}
function getSortedListByKeyValue(list: object[], key?: string): any[] {

  return []
}

describe('getRandomIndicesOfArray', () => {
  it('Returns empty array if no input', () => {
    expect(getRandomIndicesOfArray()).toHaveLength(0)
  })
  it('Where n = 100, return number array with length 10', () => {
    expect(
      getRandomIndicesOfArray(
        Array.from(Array(100).keys()), 10
      )).toHaveLength(10)
  })
  it('Where n = 5, return number array with length 5', () => {
    expect(
      getRandomIndicesOfArray(Array.from(Array(5).keys()), 10)
    ).toHaveLength(5)
  })
  it('Where n = 0, return number array with length 0', () => {
    expect(
      getRandomIndicesOfArray([], 10)
    ).toHaveLength(5)
  })
})

describe('getSortedListByKeyValue', () => {
  it('Returns same list if no key specified', () => {
    const sortableList: any[] = mockSortableStoryList(100)
    expect(JSON.stringify(getSortedListByKeyValue(sortableList))).toEqual(JSON.stringify(sortableList))
  })
  const sortableList: any[] = mockSortableStoryList(100)
  it('Returns list in descending order by key "score"', () => {
    let previousValue: number = Number.MAX_SAFE_INTEGER
    let isSorted: boolean = true
    const sortedStoryList = getSortedListByKeyValue(sortableList, 'score')
    for (let i = 0; i < sortedStoryList.length, i++;) {
      if (previousValue < sortedStoryList[i]) {
        isSorted = false
        return
      }
    }
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