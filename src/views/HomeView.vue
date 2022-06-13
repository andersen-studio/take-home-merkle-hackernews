<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchTopStories, fetchStory, fetchUser } from '@/services/HackerNewsAxios';
import { getArraySample, getSortedByKey } from '@/helpers/ArrayHelpers';
import StoryItem from '@/components/StoryItem.vue';
import { Story } from '@/interfaces/Story'
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const loading = ref<boolean>(false)
const error = ref<boolean>(false)
const stories = ref<Story[]>([])

async function retrieveStory(storyId: number): Promise<Story | null> {
  loading.value = true
  const storyData = await fetchStory(storyId)
  if (storyData) {
    const authorData = await fetchUser(storyData.by)
    if (authorData) {
      return { ...storyData, ...{ author: authorData, thumbnail: `https://picsum.photos/seed/${storyData.id}/500/500` } }
    }
  }
  return null
}

onMounted(async () => {
  const fetchedStoryIds = await fetchTopStories()
  if (fetchedStoryIds == null) return error.value = true
  const fetchedStories: Story[] = []
  const tasks: Promise<Story | void>[] = getArraySample(fetchedStoryIds).map((storyId: number) => {
    return new Promise<Story | void>((resolve, reject) => {
      retrieveStory(storyId).then((story) => {
        if (story) fetchedStories.push(story)
        resolve()
      }).catch(resolve)
    })
  })
  await Promise.all(tasks)
  stories.value = getSortedByKey(fetchedStories, 'score')
  loading.value = false
})
</script>

<template>
  <div class="p-md flex w-full mx-auto max-w-container" v-if="!loading && stories">
    <StoryItem v-for="story in stories" :story="story" :key="story.id" />
  </div>
  <LoadingSpinner v-else />
</template>
