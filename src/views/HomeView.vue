<script setup lang="ts">
import { Story } from '@/interfaces/Story'
import { ref, onMounted } from 'vue'
import { fetchStory, fetchTopStories, fetchUser } from '@/services/HackerNewsAxios';
import { getArraySample, getSortedByKey } from '@/helpers/ArrayHelpers';
import StoryItem from '@/components/StoryItem.vue';

const loading = ref<boolean>(false)
const error = ref<boolean>(false)
const stories = ref<number[]>([])

async function retrieveData(): Promise<number[] | null> {
  loading.value = true
  const stories = await fetchTopStories()
  return stories || null
}

// lifecycle hooks
onMounted(async () => {
  const fetchedStoryIds = await retrieveData()
  loading.value = false
  if (fetchedStoryIds == null) return error.value = true
  stories.value = getSortedByKey(getArraySample(fetchedStoryIds), 'score')
})
</script>

<template>
  <div v-if="!loading && stories">
    <StoryItem v-for="storyId in stories" :storyId="storyId" :key="storyId" />
  </div>
  <div class="loading" v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.card {
  padding: 8px 16px;
}
</style>