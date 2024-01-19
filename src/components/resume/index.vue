<script setup lang="ts">
import data from '../../config/data'
import Item from "../../components/resume/Item.vue";

const {info, contact} = data
const {name, position, location, gender, age} = info
const {tel, wechat, email, github} = contact
const skillList = data.skillList.map((skill: any) => {
  return {
    desc: skill.skillDesc
  }
})
const workList = data.workList.map((work: any) => {
  const {company, apartment, position, workDate, workDesc} = work
  const brief = [apartment, position, workDate]
  return {
    name: company,
    brief,
    desc: workDesc
  }
})
const projectList = data.projectList.map((project: any) => {
  return {
    name: project.project,
    brief: project.projectDesc,
    desc: project.projectContent
  }
})

const eduList = data.eduList.map((edu: any) => {
  const {university, degree, major, eduDate} = edu
  const brief = [university, major, degree, eduDate]
  return {
    name: '',
    brief
  }
})
</script>

<template>
  <div flex flex-wrap px-10 py-5 mx-auto my-8 mb-32 border-1 border-rd-1 border-solid max-w-4xl>
    <!--    header-->
    <header block w-full>
      <section text-4xl w-full pb-5>
        {{ name }}
      </section>
      <section max-w-full flex pb-5 justify-between>
        <div text-left>
          <span>{{ age }}</span>
          <span px-3>|</span>
          <span>{{ gender }}</span>
          <span px-3>|</span>
          <span>{{ location }}</span>
          <div>{{ position }}</div>
        </div>
        <div flex flex-col>
          <div flex justify-end>
            <span>{{ tel }}</span>
            <span i-carbon-phone font-size-5.5 pl-2></span>
          </div>
          <div flex justify-end>
            <span>{{ wechat }}</span>
            <span i-carbon-logo-wechat font-size-5.5 pl-2></span>
          </div>
          <div inline-flex justify-end content-center>
            <span>{{ email }}</span>
            <span i-carbon-email font-size-5.5 pl-2></span>
          </div>
          <div flex justify-end>
            <span>{{ github }}</span>
            <a i-carbon-logo-github font-size-5.5 pl-2 href="https://github.com/09473ZH" target="_blank"/>
          </div>
        </div>
      </section>
    </header>
    <!--    content-->
    <section w-full text-left>
      <Item :title=data.items.skill :item-info-list="skillList"/>
      <Item :title=data.items.work :item-info-list="workList"/>
      <Item :title=data.items.project :item-info-list="projectList"/>
      <Item :title=data.items.edu :item-info-list="eduList"/>
    </section>
  </div>
</template>

<style scoped>

</style>
