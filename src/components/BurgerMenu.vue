<script setup>

import BurgerMenuHeading from "./BurgerMenuHeading.vue";
import BurgerMenuItemGroup from "./BurgerMenuItemGroup.vue";
import {Cog, Folders, Users} from "lucide-vue-next";
import BurgerMenuItem from "./BugerMenuItem.vue";
import HeadingText from "./HeadingText.vue";
import {useRoute} from "vue-router";
import {useUserManager} from "../composables/userManager.js";
import {ref, watchEffect} from "vue";
import { User } from "lucide-vue-next";

const route = useRoute()
const user = ref(null)

watchEffect(async () => {
  if (!route.params.tenant) {
    return
  }

  const userMgr = await useUserManager(route.params.tenant);
  user.value = await userMgr.getUser()
})

</script>

<template>
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
      <div class="p-2 bg-offwhite rounded-md flex flex-row items-center gap-2" v-if="user">
        <div class="rounded-full bg-slate-200 font-semibold text-sm justify-center items-center flex overflow-hidden size-12">
          <div class="flex items-center justify-center">
            <User/>
          </div>
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-nowrap text-ellipsis overflow-hidden">{{ user.profile.name }}</span>
          <span class="text-xs text-slate-400 text-nowrap text-ellipsis overflow-hidden">{{ user.profile.sub }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>