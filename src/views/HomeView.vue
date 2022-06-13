<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchTopStories } from '@/services/HackerNewsAxios';
import { getArraySample, getSortedByKey } from '@/helpers/ArrayHelpers';
import StoryItem from '@/components/StoryItem.vue';

const loading = ref<boolean>(false)
const error = ref<boolean>(false)
const stories = ref<number[]>([])

onMounted(async () => {
  const fetchedStories = await fetchTopStories()
  loading.value = false
  if (fetchedStories == null) return error.value = true
  stories.value = getSortedByKey(getArraySample(fetchedStories), 'score')
})
</script>

<template>
  <div class="p-md flex w-full mx-auto max-w-container" v-if="!loading && stories">
    <StoryItem v-for="storyId in stories" :storyId="storyId" :key="storyId" />
  </div>
  <div class="loading" v-else>
    <p>Loading...</p>
  </div>
</template>
