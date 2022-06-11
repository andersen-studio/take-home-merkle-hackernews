function _recursivelyGetUniqueRandomIndices(inputArray: any[] = [], maxLength: number = 10, resultArray: any[] = [], visited: any = {}): any[] {
  if (resultArray.length >= maxLength) return resultArray
  const randomTargetIndex = Math.floor(inputArray.length * Math.random())
  if (!visited[randomTargetIndex]) {
    visited[randomTargetIndex] = true
    resultArray.push(inputArray[randomTargetIndex])
  }
  return _recursivelyGetUniqueRandomIndices(inputArray, maxLength, resultArray, visited)
}

export function getArraySample(inputArray: any[] = [], maxLength: number = 10) {
  if (inputArray.length < maxLength) return inputArray
  return _recursivelyGetUniqueRandomIndices(inputArray, maxLength)
}

export function getSortedByKey(list: object[], key?: string): any[] {
  if (!key) return list
  return list.sort((a: any, b: any) => {
    return (b[key] || 0) > (a[key] || 0) ? 1 : -1
  })
}