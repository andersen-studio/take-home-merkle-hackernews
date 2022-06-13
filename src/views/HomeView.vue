<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchTopStories, fetchStory, fetchUser } from '@/services/HackerNewsAxios';
import { getArraySample, getSortedByKey } from '@/helpers/ArrayHelpers';
import StoryItem from '@/components/StoryItem.vue';
import { Story } from '@/interfaces/Story'

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
  <div class="spinner" v-else>
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<style scoped>
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -20px;
  margin-left: -40px;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>