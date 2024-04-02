<script setup lang="ts">
import { useVModels } from '@vueuse/core'

interface Props {
  title: string
  itemInfoList: ItemInfoType[]
}

interface ItemInfoType {
  name?: string
  brief?: string[]
  desc?: string[]
}

const props = defineProps<Props>()

const item = useVModels(props)
function renderText(text: string) {
  const linkRegex = /\[([^\]]+)]\(([^)]+)\)/g
  const keywordRegex = /<strong>(.*?)<\/strong>/g

  let parsedText = text.replace(linkRegex, (_, content, url) => `<a href="${url}" target="_blank">${content}</a>`)
  parsedText = parsedText.replace(keywordRegex, (_, content) => `<strong>${content}</strong>`)

  return parsedText
}
</script>

<template>
  <div>
    <div class="bg-[#eae0daff] border-0 border-l-5 border-solid font-semibold p0.5 px-2 text-lg">
      {{ item.title.value }}
    </div>
    <div py-2>
      <div v-for="(info, index) in item.itemInfoList.value" :key="index" class="[&:last-child]:pb-1">
        <div v-if="info?.name !== undefined" font-medium text-gray-900 pt-1>
          {{ info.name }}
        </div>
        <div v-if="info && (info.brief || []).length !== 0" pt-1 flex justify-between text-left>
          <span
            v-for="(brief, briefIndex) in info.brief"
            :key="briefIndex"
            flex-1
            :class="{ 'flex-grow-2': briefIndex === 2 && info.brief!.length === 3, 'text-right': briefIndex === info.brief!.length - 1 && info.brief!.length !== 1 }"
          >
             <span v-html="renderText(brief)" />
          </span>
        </div>
        <ul v-if="info && (info.desc || []).length !== 0" ps-3 pt-1 space-y-1 list-disc list-inside>
          <li v-for="(desc, descIndex) in info.desc" :key="descIndex">
            <span v-html="renderText(desc)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
ul {
  padding: 0;
  margin: 0;
}

li {
  padding: 0;
}

a {
  color: #18272F;
  position: relative;
  text-decoration: none;
}

a::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background-color: #1f2f36;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform .3s ease-in-out;
}

a:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}
</style>
