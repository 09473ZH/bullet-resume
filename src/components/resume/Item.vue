<script setup lang="ts">
import {useVModels} from '@vueuse/core'
import {computed} from "vue";

type Props = {
  title: string,
  itemInfoList: ItemInfoType[]
};

type ItemInfoType = {
  name: string,
  brief: string[],
  desc: string[],
}
const props = withDefaults(defineProps<Props>(), {
  title: 'hello',
  itemInfoList: () => [{
    name: '',
    brief: [],
    desc: [],
  }]
})
const item = useVModels(props)

</script>

<template>
  <div>
    <div item-title>
      <span>{{ item.title.value }}</span>
    </div>
    <div v-for="(info, index) in itemInfoList" :key="index" class="[&:last-child]:pb-1">
      <div pt-1 v-if="String(info.name) !== 'undefined'">{{ info.name }}</div>
      <div v-if="(info.brief || []).length !== 0" pt-1 flex justify-between text-left>
        <span v-for="(brief, index) in info.brief"
              :key="index"
              flex-1
              :class="{ 'flex-grow-2' :index === 2 && info.brief.length == 3 ,'text-right': index === info.brief.length - 1 && info.brief.length !== 1 }">
            {{ brief }}
        </span>
      </div>
      <ul pt-1>
        <li v-for="(desc, index) in info.desc" :key="index">{{ desc }}</li>
      </ul>
    </div>
  </div>
</template>
<style>
ul {
  padding: 0 2rem;
  margin: 0;
}

li {
  padding: 0;
}
</style>
