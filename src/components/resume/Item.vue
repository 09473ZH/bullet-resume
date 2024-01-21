<script setup lang="ts">
import {useVModels} from '@vueuse/core'

type Props = {
  title: string,
  itemInfoList: ItemInfoType[]
}

type ItemInfoType = {
  name?: string,
  brief?: string[],
  desc?: string[],
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  itemInfoList: () => [{
    name: undefined,
    brief: [],
    desc: [],
  }]
})

const item = useVModels(props)

</script>

<template>
  <div>
    <div text-lg font-semibold border-solid border-0 border-l-5  p0.5 px-2 bg-gray-100>{{ item.title.value }}</div>
    <div v-for="(info, index) in item.itemInfoList.value" :key="index" class="[&:last-child]:pb-1">
      <div font-medium text-gray-900  pt-1 v-if="info?.name !== undefined">{{ info.name }}</div>
      <div v-if="info && (info.brief || []).length !== 0" pt-1 flex justify-between text-left>
        <span v-for="(brief, index) in info.brief"
              :key="index"
              flex-1
              :class="{ 'flex-grow-2' :index === 2 && info.brief!.length == 3 ,'text-right': index === info.brief!.length - 1 && info.brief!.length !== 1 }">
            {{ brief }}
        </span>
      </div>
      <ul v-if="info && (info.desc || []).length !== 0" ps-3 pt-1 space-y-1 list-disc list-inside>
        <li v-for="(desc, index) in info.desc" :key="index">{{ desc }}</li>
      </ul>
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
</style>
