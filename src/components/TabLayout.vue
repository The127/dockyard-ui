<script setup>

import {ref, provide, onMounted, nextTick} from "vue";
import {useRoute} from "vue-router";

const tabs = ref([])
const route = useRoute()

const register = (tab) => {
  for (let t of tabs.value) {
    if (t.name === tab.name) {
      return
    }
  }

  tabs.value.push(tab)
}

provide('tabManager', {
  register,
})

const select = (tab) => {
  for (let t of tabs.value) {
    if (t.name === tab.name) {
      t.setActive(true)
      t.active = true
    }else{
      t.setActive(false)
      t.active = false
    }
  }
}

onMounted(async () => {
  await nextTick()

  if (route.query.tab) {
    for (const tab of tabs.value) {
      if (tab.name === route.query.tab) {
        select(tab)
        return
      }
    }
  }

  select(tabs.value[0])
})

</script>

<template>
  <div class="flex flex-row">
    <div v-for="tab in tabs"
         :key="tab.title"
         @click="select(tab)"
        :data-active="tab.active ? true : null"
         class="font-semibold ease-linear px-2 py-1 border-b-2
            [[data-active]]:not-dark:text-cyan-600 [[data-active]]:not-dark:border-b-cyan-600
            [[data-active]]:dark:text-cyan-200 [[data-active]]:dark:border-b-cyan-200
            hover:not-dark:text-slate-500 hover:dark:text-slate-400 cursor-pointer
            border-b-slate-300"
    >
      {{ tab.title }}
    </div>
  </div>
  <slot/>
</template>

<style scoped>

</style>