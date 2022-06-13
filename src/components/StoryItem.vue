<script setup lang="ts">
import { Story } from '@/interfaces/Story'
import { ref, onMounted } from 'vue'
import { fetchStory, fetchUser } from '@/services/HackerNewsAxios';
import { defineProps } from 'vue';
import { parseEpochTimestamp } from '@/helpers/TimeHelpers';

const props = defineProps<{
  storyId: number
}>()

const loading = ref<boolean>(false)
const error = ref<boolean>(false)
const story = ref<Story>({
  by: '',
  author: {
    about: '',
    created: 0,
    id: '',
    karma: 0,
    submitted: []
  },
  descendants: 0,
  id: 0,
  kids: [],
  score: 0,
  time: 0,
  title: '.',
  type: '',
  url: '',
  thumbnail: ``
})

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
  <div class="w-1-of-5 p-md m-md card max-w-full bg-dark-lighter" :class="{ loading }">
    <a :href="story.url || 'https://news.ycombinator.com/item?id=' + props.storyId">
      <div class="py-2 px-2 skeleton">
        <div class="title font-bold mb-md">{{ story.title || ' ' }}</div>
        <div class="time">{{ parseEpochTimestamp(story.time) }}</div>
        <div>Score: {{ story.score }}</div>
        <div>Author: {{ story.author.id }}</div>
        <div>Karma: {{ story.author.karma }}</div>
      </div>
    </a>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 500px;
  border-radius: 6px;

  /* Prevents overflow */
  min-width: 0;
}

.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.skeleton>*,
.card {
  transition: all 100ms ease-in-out;
  transform: scale(1, 1);
}

.card.loading {
  opacity: 0.5;
  transform: scale(0.9, 0.9);
}

.loading .skeleton>* {
  color: rgba(0, 0, 0, 0);
  border-radius: 4px;
}
</style>