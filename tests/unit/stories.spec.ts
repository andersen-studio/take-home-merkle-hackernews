import { shallowMount } from '@vue/test-utils'
import StoryItem from '@/components/StoryItem.vue'
import { Story } from '@/interfaces/Story'

const mockedStory: Story = {
  by: 'MockMan',
  descendants: 0,
  id: Math.floor(Math.random() * 100000),
  kids: [],
  score: Math.floor(Math.random() * 1000),
  time: new Date().getTime(),
  title: 'MockMan Strikes Again!',
  type: 'story',
  url: 'https://mockman.com',
  thumbnail: `https://picsum.photos/seed/${new Date().getTime()}/200/300`
}

describe('StoryItem', () => {
  const mockId = Math.floor(Math.random() * 100000)
  const wrapper = shallowMount(StoryItem, {
    data() {
      return {
        id: mockedStory.id,
        data: mockedStory
      }
    }
  })
  it('Starts off in loading state with given ID', () => {
    expect(wrapper).toHaveProperty('loading', true)
    expect(wrapper).toHaveProperty('id', mockId)
  })
})