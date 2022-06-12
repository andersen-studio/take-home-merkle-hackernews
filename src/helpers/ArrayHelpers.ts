// Happy path only iterates maxLength times, but worst case towards infinity.
function _recursivelyGetUniqueRandomItems(inputArray: any[] = [], maxLength: number = 10, resultArray: any[] = [], visited: any = {}): any[] {
  if (resultArray.length >= maxLength) return resultArray
  const randomTargetIndex = Math.floor(inputArray.length * Math.random())
  if (!visited[randomTargetIndex]) {
    visited[randomTargetIndex] = true
    resultArray.push(inputArray[randomTargetIndex])
  }
  return _recursivelyGetUniqueRandomItems(inputArray, maxLength, resultArray, visited)
}

// Always iterates only maxLength times. O(maxLength). Recommended.
export function getArraySample(inputArray: any[] = [], maxLength: number = 10): any[] {
  let steps = 0
  const workingArray = inputArray.slice(0)
  let i = workingArray.length
  while (--i > 0 && steps <= maxLength) {
    let target = Math.floor(Math.random() * i + 1)
    let temp = workingArray[target]
    inputArray[target] = workingArray[i]
    workingArray[i] = temp
    steps++
  }
  return workingArray.length > maxLength
    ? workingArray.slice(-maxLength)
    : workingArray
}

export function getSortedByKey(list: object[], key?: string): any[] {
  if (!key) return list
  return list.sort((a: any, b: any) => {
    return (b[key] || 0) > (a[key] || 0) ? 1 : -1
  })
}