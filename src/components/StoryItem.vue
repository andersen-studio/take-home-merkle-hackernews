<script setup lang="ts">
import { Story } from '@/interfaces/Story'
import { ref, onMounted } from 'vue'
import { fetchStory, fetchUser } from '@/services/HackerNewsAxios';
import { defineProps } from 'vue';
import { parseEpochTimestamp } from '@/helpers/TimeHelpers';

const props = defineProps<{
  story: Story
}>()

const loading = ref<boolean>(true)
const error = ref<boolean>(false)
const story = ref<Story>(props.story)

// lifecycle hooks
onMounted(async () => {
  const backgroundImg: any = document.createElement('img')
  backgroundImg.setAttribute('src', story.value.thumbnail.toString())
  backgroundImg.addEventListener('load', () => {
    loading.value = false
  })
})
</script>

<template>
  <a class="w-1-of-5 m-md card max-w-full border-dark bg-dark-lighter" :class="{ loading }" target="_blank"
    :href="story.url || 'https://news.ycombinator.com/item?id=' + story.id"
    :style="loading ? 'background-image: none;' : `background-image: url(${story.thumbnail});`">
    <div class="pb-md pl-md pr-md skeleton">
      <span class="score p-md bg-dark text-lg font-bold">
        <div>{{ story.score }}</div>
        <div class="text-md text-accent ">Point{{ story.score > 1 ? 's' : '' }}</div>
      </span>
      <div class="title text-display mb-sm">
        {{ story.title || ' ' }}
      </div>
      <div class="font-thin">
        Posted by <span class="text-accent font-regular">{{ story.author.id }}</span> - {{ story.author.karma }} karma
        <div class="mt-sm">
          {{
              parseEpochTimestamp(story.time)
          }}
        </div>
      </div>
    </div>
  </a>
</template>
<style scoped lang="scss">
.skeleton {
  padding-top: 200px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  opacity: 1;
  transition: opacity 500ms ease-in-out;
}

.points {
  border-radius: 16px;
}

.score {
  position: absolute;
  top: 0;
  right: 0;
}

.loading .skeleton {
  opacity: 0;
}

.card {
  width: 500px;
  border-radius: 6px;
  background-size: cover;
  padding-top: 100px;
  min-width: 0;
  border-style: solid;
  border-width: 5px;
}

.card {
  transition: all 200ms ease-in-out;
  background-position: center center;
  position: relative;
}

.card .skeleton>div {
  transition: top 100ms ease-in-out;
  position: relative;
  top: 0;
}

.card:hover .skeleton>div {
  top: -32px;
}

.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.skeleton>*,
.card {
  transition: all 100ms ease-in-out;
}

.card.loading {
  opacity: 0.5;
}

.loading .skeleton>* {
  color: rgba(0, 0, 0, 0);
  border-radius: 4px;
}

.score {
  border-bottom-left-radius: 4px;
  text-align: right;
}
</style>