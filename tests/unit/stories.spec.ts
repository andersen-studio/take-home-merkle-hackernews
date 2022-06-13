import StoryItem from '@/components/StoryItem.vue'
import { HackerNewsUser } from '@/interfaces/HackerNewsUser'
import { Story } from '@/interfaces/Story'
import { shallowMount, VueWrapper } from '@vue/test-utils'

const mockedAuthor: HackerNewsUser = {
  about: 'Some hacker',
  created: new Date().getTime(),
  id: 'MockMan',
  karma: 123,
  submitted: []
}

const mockedStory: Story = {
  by: 'MockMan',
  author: mockedAuthor,
  descendants: 0,
  id: 123,
  kids: [],
  score: Math.floor(Math.random() * 1000),
  time: new Date().getTime(),
  title: 'MockMan Strikes Again!',
  type: 'story',
  url: 'https://mockman.com',
  thumbnail: `https://picsum.photos/seed/${new Date().getTime()}/200/300`
}


const uiElementsWanted: string[] = ["title", "url", "time", "score", "author-id", "author-karma"]

describe('StoryItem', () => {
  const mockId: number = Math.floor(Math.random() * 100000)
  const wrapper: VueWrapper = shallowMount(StoryItem, {
    data() {
      return {
        storyId: mockedStory.id
      }
    }
  })
  describe('While loading...', () => {
    it('Is set to "loading"', () => {
      expect(wrapper.find('.loading').exists()).toBe(true)
    })
    it('Has skeleton loader for all story elements', () => {
      uiElementsWanted.map((elementClass) => {
        expect(wrapper.find('.loading.' + elementClass).exists()).toBe(true)
      })
    })
  })
})