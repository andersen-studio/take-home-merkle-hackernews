<script setup lang="ts">
import { Story } from '@/interfaces/Story'
import { ref, onMounted } from 'vue'
import { fetchStory, fetchUser } from '@/services/HackerNewsAxios';
import { defineProps } from 'vue';

const props = defineProps<{
  storyId: number
}>()

const loading = ref<boolean>(false)
const error = ref<boolean>(false)
const story = ref<Story | null>(null)

async function retrieveData(storyId: number): Promise<Story | null> {
  loading.value = true
  const storyData = await fetchStory(storyId)
  if (storyData) {
    const authorData = await fetchUser(storyData.by)
    if (authorData) {
      return { ...storyData, ...{ author: authorData, thumbnail: `https://picsum.photos/seed/${storyData.id}/200/100` } }
    }
  }
  return null
}

// lifecycle hooks
onMounted(async () => {
  const fetchedStory = await retrieveData(props.storyId)
  loading.value = false
  if (fetchedStory == null) return error.value = true
  story.value = fetchedStory
})
</script>

<template>
  <div v-if="!loading && story">
    <a :href="story.url">
      <div class="card">
        <div>Title: {{ story.title }}</div>
        <div>Time: {{ story.time }}</div>
        <div>Score: {{ story.score }}</div>
        <div>Author: {{ story.author.id }}</div>
        <div>Karma: {{ story.author.karma }}</div>
      </div>
    </a>
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