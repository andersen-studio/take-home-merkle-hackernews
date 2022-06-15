import { HackerNewsStory } from "@/interfaces/HackerNewsStory"
import { HackerNewsUser } from "@/interfaces/HackerNewsUser"
import axios from "axios"

export const HACKERNEWS_API_VERSION = 0
export const HACKERNEWS_BASE_URL = `https://hacker-news.firebaseio.com/v${HACKERNEWS_API_VERSION}`

async function tryGet(resource: string, fallback: [] | null): Promise<any> {
  try {
    return (await axios.get(`${HACKERNEWS_BASE_URL}/${resource}`)).data
  } catch (e) {
    return fallback
  }
}

export const fetchTopStories = async (): Promise<number[]> => {
  return await tryGet('topstories.json', [])
}

export const fetchStory = async (id: number): Promise<HackerNewsStory | null> => {
  return await tryGet(`item/${id}.json`, null)
}

export const fetchUser = async (id: string): Promise<HackerNewsUser | null> => {
  return await tryGet(`user/${id}.json`, null)
}
