import { fetchTopStories, fetchStory, HACKERNEWS_BASE_URL, fetchUser } from "@/services/HackerNewsAxios";
import axios from "axios"
jest.mock("axios")

const mockedAxios = axios as jest.Mocked<typeof axios>

const fetchTopStoriesResponse: number[] = [123, 123, 123, 123]

mockedAxios.get.mockImplementation((url) => {
  switch (url) {
    case `${HACKERNEWS_BASE_URL}/topstories.json`:
      return Promise.resolve({ data: [123, 123, 123, 123] })
    case `${HACKERNEWS_BASE_URL}/item/${123}.json`:
      return Promise.resolve({ data: { id: 123 } })
    case `${HACKERNEWS_BASE_URL}/user/${123}.json`:
      return Promise.resolve({ data: { id: '123' } })
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe("fetchTopStories", () => {
  describe("If successful API call", () => {
    it("Should return number[]", async () => {
      const result = await fetchTopStories()
      expect(result).toEqual(fetchTopStoriesResponse)
    })
  })
  describe("If bad API call", () => {
    it("Should return empty array", async () => {
      mockedAxios.get.mockRejectedValueOnce(null)
      const result = await fetchTopStories()
      expect(result).toEqual([])
    })
  })
})

describe("fetchStory", () => {
  describe("If successful API call", () => {
    it("Should return object", async () => {
      const result = await fetchStory(123)
      expect(result).toEqual({ id: 123 })
    })
  })
  describe("If bad API call", () => {
    it("Should return null on API error", async () => {
      mockedAxios.get.mockRejectedValueOnce(null)
      const result = await fetchStory(123)
      expect(result).toBe(null)
    })
  })
})

describe("fetchUser", () => {
  describe("If successful API call", () => {
    it("Should return object", async () => {
      const result = await fetchUser('123')
      expect(result).toEqual({ id: '123' })
    })
  })
  describe("If bad API call", () => {
    it("Should return null on API error", async () => {
      mockedAxios.get.mockRejectedValueOnce(null)
      const result = await fetchUser('123')
      expect(result).toBe(null)
    })
  })
})