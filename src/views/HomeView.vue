<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchTopStories, fetchStory, fetchUser } from '@/services/HackerNewsAxios';
import { getArraySample, getSortedByScore } from '@/helpers/ArrayHelpers';
import StoryItem from '@/components/StoryItem.vue';
import FlexList from '@/components/FlexList.vue'
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

async function loadStories() {
  loading.value = true
  const fetchedStoryIds = await fetchTopStories()
  if (fetchedStoryIds == null) return error.value = true
  const fetchedStories: Story[] = []
  const tasks: Promise<Story | void>[] = getArraySample(fetchedStoryIds).map((storyId: number) => {
    return new Promise<Story | void>((resolve) => {
      retrieveStory(storyId).then((story) => {
        if (story) fetchedStories.push(story)
        resolve()
      }).catch(resolve)
    })
  })
  await Promise.all(tasks)
  stories.value = getSortedByScore(fetchedStories)
  loading.value = false
}

onMounted(async () => {
  loadStories()
})
</script>

<template>
  <div class="w-full mx-auto max-w-container pt-lg">
    <div class="fixed bg-dark w-full flex flex-center max-w-container pl-md pr-md pt-md pb-md">
      <h1 class="logo pl-md ml-sm bg-dark">Random Hacker News</h1>
      <button tabindex="0" style="border-style: solid;" :class="{ disabled: loading }"
        class="max-w-200 button border border-dark-lighter p-md bg-dark-lighter text-md text-light"
        @click="loadStories()">GET 10 NEW STORIES</button>
      <a target="_blank" class="max-w-200 button text-center text-md p-md border border-dark-lighter"
        href="https://github.com/andersen-studio/take-home-merkle-hackernews">GitHub</a>
    </div>
  </div>
  <FlexList v-if="!loading && stories">
    <StoryItem v-for="story in stories" :story="story" :key="story.id" />
  </FlexList>
  <LoadingSpinner v-else />
</template>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  opacity: 1;
  transition: opacity 100ms ease-in-out;
}

.button.disabled {
  cursor: inherit;
  pointer-events: none;
  opacity: 0.5;
}

.logo {
  font-size: 1.2rem;
  align-self: center;
}
</style>