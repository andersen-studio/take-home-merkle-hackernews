<script setup lang="ts">
import { Story } from '@/interfaces/Story'
import { defineProps, ref, onMounted } from 'vue'
import { parseEpochTimestamp } from '@/helpers/TimeHelpers';

const props = defineProps<{
  story: Story
}>()

const loading = ref<boolean>(true)
const story = ref<Story>(props.story)

// lifecycle hooks
onMounted(async () => {
  const backgroundImg = document.createElement('img')
  backgroundImg.setAttribute('src', story.value.thumbnail.toString())
  backgroundImg.addEventListener('load', () => {
    loading.value = false
  })
})
</script>

<template>
  <a class="w-1-of-5 m-md card max-w-full border-dark border bg-dark-lighter mobile-no-pt" :class="{ loading }"
    target="_blank" :href="story.url || 'https://news.ycombinator.com/item?id=' + story.id" :style="loading ?
    'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);'
    : `background-image: url(${story.thumbnail});`">
    <div class="pb-md pl-md pr-md skeleton">
      <span class="score p-md bg-dark text-lg font-bold">
        <div>{{ story.score }}</div>
        <div class="text-md text-accent ">Point{{ story.score > 1 ? 's' : '' }}</div>
      </span>
      <div class="title line-height-title text-display mb-sm">
        {{ story.title || ' ' }}
      </div>
      <div class="font-thin info">
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
  padding-top: 150px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  opacity: 1;
  transition: opacity 500ms ease-in-out;

  >div {
    transition: all 200ms ease-in-out;
  }
}

.score {
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 4px;
  overflow: visible;
  text-align: right;
}

.card {
  width: 500px;
  border-radius: 4px;
  overflow: hidden;
  background-size: cover;
  padding-top: 100px;
  min-width: 0;
  transition: all 200ms ease-in-out;
  background-position: center center;
  position: relative;
  transition: all 200ms ease-in-out;
  -webkit-animation: fadein 150ms ease-in-out;
  -moz-animation: fadein 150ms ease-in-out;
  -ms-animation: fadein 150ms ease-in-out;
  -o-animation: fadein 150ms ease-in-out;
  animation: fadein 150ms ease-in-out;

  .skeleton {
    >div {
      transition: top 200ms ease-in-out;
      position: relative;
      top: 0;
    }
  }

  &:hover {
    .skeleton {
      >div {
        top: -10px;
      }
    }
  }
}
</style>