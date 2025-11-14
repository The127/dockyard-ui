<script setup>

import { Users, Folders, Cog } from 'lucide-vue-next';
import BurgerMenuHeading from "./components/BurgerMenuHeading.vue";
import BurgerMenuItem from "./components/BugerMenuItem.vue";
import BurgerMenuItemGroup from "./components/BurgerMenuItemGroup.vue";
import HeadingText from "./components/HeadingText.vue";
import {useRoute} from "vue-router";

const route = useRoute()

</script>

<template>
  <div class="flex flex-row h-screen w-screen">
    <div class="flex flex-col bg-slate-100 border-r border-r-slate-200 p-2 gap-2 min-w-xs max-w-xs w-xs">
      <div class="p-2 border-b border-b-slate-200">
        <HeadingText>dockyard</HeadingText>
      </div>

      <BurgerMenuItemGroup>
        <BurgerMenuHeading>
          Administration
        </BurgerMenuHeading>
        <BurgerMenuItem v-if="route.params.tenant" :to="{name: 'tenant-overview'}">
          <Users class="w-4"/> Tenants
        </BurgerMenuItem>
      </BurgerMenuItemGroup>

      <BurgerMenuItemGroup>
        <BurgerMenuHeading>
          General
        </BurgerMenuHeading>
        <BurgerMenuItem v-if="route.params.tenant" :to="{name: 'project-overview'}">
          <Folders class="w-4"/> Projects
        </BurgerMenuItem>
      </BurgerMenuItemGroup>

      <BurgerMenuItemGroup class="flex-1 justify-end">
        <BurgerMenuItem v-if="route.params.tenant" :to="{name: 'settings'}">
          <Cog class="w-4"/> Settings
        </BurgerMenuItem>
      </BurgerMenuItemGroup>

      <div class="p-2 border-t border-t-slate-200 mt-2">
        <div class="p-2 bg-offwhite rounded-md flex flex-row items-center gap-2">
          <div class="rounded-full w-12 h-12 bg-slate-200 font-semibold text-sm justify-center items-center flex overflow-hidden">
            <div class="flex items-center justify-center">
              KK
            </div>
          </div>
          <div class="flex flex-col overflow-hidden">
            <span>Karolin Kostial</span>
            <span class="text-xs text-slate-400 text-nowrap text-ellipsis overflow-hidden">ba78ef2d-3e98-451d-9f96-eb0a7fc36c3easdasd</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 bg-offwhite p-4">
      <div class="">
        TODO: search
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
</style>
