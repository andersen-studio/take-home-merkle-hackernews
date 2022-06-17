import { Story } from "@/interfaces/Story"

// Always iterates only maxLength times. O(maxLength). Recommended.
export function getArraySample(inputArray: number[] = [], maxLength = 10): number[] {
  let steps = 0
  const workingArray = inputArray.slice(0)
  let i = workingArray.length
  while (--i > 0 && steps <= maxLength) {
    const target = Math.floor(Math.random() * i + 1)
    const temp = workingArray[i]
    workingArray[i] = workingArray[target]
    workingArray[target] = temp
    steps++
  }
  return workingArray.length > maxLength
    ? workingArray.slice(-maxLength)
    : workingArray
}

export function getSortedByScore(list: Story[]): Story[] {
  return list.sort((a: Story, b: Story) => {
    return b.score < a.score || 0 ? 1 : -1
  })
}