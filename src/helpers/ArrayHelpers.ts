import { Story } from "@/interfaces/Story"

// Always iterates only maxLength times. O(maxLength). Recommended.
export function getArraySample(inputArray: any[] = [], maxLength = 10): any[] {
  let steps = 0
  const workingArray = inputArray.slice(0)
  let i = workingArray.length
  while (--i > 0 && steps <= maxLength) {
    const target = Math.floor(Math.random() * i + 1)
    const temp = workingArray[target]
    inputArray[target] = workingArray[i]
    workingArray[i] = temp
    steps++
  }
  return workingArray.length > maxLength
    ? workingArray.slice(-maxLength)
    : workingArray
}

export function getSortedByKey(list: Story[], key?: string): any[] {
  if (!key) return list
  return list.sort((a: object, b: object) => {
    // @ts-ignore comment
    return (parseInt(b[key]) || 0) > parseInt((a[key] || 0)) ? 1 : -1
  })
}