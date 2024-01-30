<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import {
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
  WechatOutlined,
} from '@ant-design/icons-vue'

import data from '@/config/data.json'
import Item from '@/components/resume/Item.vue'

onMounted(() => {
  initFlowbite()
})

const { info, contact } = data
const { name, position, location, gender, age } = info
const { tel, wechat, email, github } = contact

interface ItemType {
  [key: string]: any
}

interface Options {
  nameKey?: string
  briefKeys?: string[]
  descKey?: string
}

interface FormattedData {
  name?: string
  brief?: string[]
  desc?: string[]
}

function formatDataList(dataList: ItemType[], options: Options = {}): FormattedData[] {
  return dataList.map((item: ItemType) => {
    const {
      nameKey,
      briefKeys,
      descKey,
    } = options

    const name = nameKey ? item[nameKey] : undefined
    let brief: string[] = []
    if (briefKeys)
      brief = briefKeys.map((key: string) => item[key] || undefined)

    const desc = descKey ? item[descKey] : null

    return {
      name,
      brief,
      desc,
    }
  })
}

const skillList: FormattedData[] = formatDataList(data.skillList, { descKey: 'skillDesc' })
const workList: FormattedData[] = formatDataList(data.workList, {
  nameKey: 'company',
  briefKeys: ['apartment', 'position', 'workDate'],
  descKey: 'workDesc',
})
const projectList: FormattedData[] = formatDataList(data.projectList, {
  nameKey: 'project',
  briefKeys: ['projectBrief'],
  descKey: 'projectDesc',
})
const eduList: FormattedData[] = formatDataList(data.eduList, {
  nameKey: '',
  briefKeys: ['university', 'major', 'degree', 'eduDate'],
})
</script>

<template>
  <div>
    <div id="toolbox">
      <button
        onclick="window.print()" data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button"
        class="ms-3 mb-2 md:mb-0 text-black bg-gray-100  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        打印
      </button>
      <div
        id="tooltip-right" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-[#fff7f796] bg-[#6b6e77ff] rounded-lg shadow-sm opacity-0 tooltip"
      >
        更多设置 -> 调整边距与缩放
        <div class="tooltip-arrow" data-popper-arrow />
      </div>
    </div>

    <div
      id="page" flex flex-wrap px-10 py-5 mx-auto my-8 mb-32 border-1 border-rd-1 overflow-hidden shadow-2xl
      max-w-4xl
    >
      <!--    header -->
      <header block w-full>
        <section font-semibold text-4xl w-full pb-5>
          {{ name }}
        </section>
        <section max-w-full flex pb-5 justify-between>
          <div text-left>
            <span>{{ age }}</span><span px-3>|</span>
            <span>{{ gender }}</span><span px-3>|</span>
            <span>{{ location }}</span>
            <div>{{ position }}</div>
          </div>

          <div flex flex-col>
            <div v-if="tel" flex justify-end>
              <span>{{ tel }}</span>
              <PhoneOutlined font-size-5.5 pl-2 />
            </div>

            <div v-if="wechat" flex justify-end>
              <span>{{ wechat }}</span>
              <WechatOutlined font-size-5.5 pl-2 />
            </div>

            <div v-if="email" flex justify-end>
              <span>{{ email }}</span>
              <MailOutlined font-size-5.5 pl-2 />
            </div>

            <div v-if="github" flex justify-end>
              <span>{{ github }}</span>
              <a text-black :href="`https://github.com/${github}`" target="_blank">
                <GithubOutlined font-size-5.5 pl-2 />
              </a>
            </div>
          </div>
        </section>
      </header>
      <!--    content -->
      <section w-full text-left>
        <Item :title="data.items.skill" :item-info-list="skillList" />
        <Item :title="data.items.work" :item-info-list="workList" />
        <Item :title="data.items.project" :item-info-list="projectList" />
        <Item :title="data.items.edu" :item-info-list="eduList" />
      </section>
    </div>
  </div>
</template>

<style scoped>
@media print {
  #toolbox {
    display: none;
  }

  #page {
    box-shadow: none;
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
