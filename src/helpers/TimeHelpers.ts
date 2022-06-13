import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export function parseEpochTimestamp(timestamp: number = new Date().getTime() / 1000): string | [string, (number | undefined)?] {
  const date = new Date(timestamp * 1000)
  return timeAgo.format(date)
}