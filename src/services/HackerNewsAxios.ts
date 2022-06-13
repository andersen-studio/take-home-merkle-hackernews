import { HackerNewsStory } from "@/interfaces/HackerNewsStory"
import { HackerNewsUser } from "@/interfaces/HackerNewsUser"
import axios from "axios"

export const HACKERNEWS_API_VERSION = 0
export const HACKERNEWS_BASE_URL = `https://hacker-news.firebaseio.com/v${HACKERNEWS_API_VERSION}`

export const fetchTopStories = async (): Promise<number[]> => {
  try {
    return (await axios.get(`${HACKERNEWS_BASE_URL}/topstories.json`)).data
  } catch (e) {
    return []
  }
}

export const fetchStory = async (id: number): Promise<HackerNewsStory | null> => {
  try {
    return (await axios.get(`${HACKERNEWS_BASE_URL}/item/${id}.json`)).data
  } catch (e) {
    return null
  }
}

export const fetchUser = async (id: string): Promise<HackerNewsUser | null> => {
  try {
    return (await axios.get(`${HACKERNEWS_BASE_URL}/user/${id}.json`)).data
  } catch (e) {
    return null
  }
}
