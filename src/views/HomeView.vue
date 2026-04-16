<script setup>

import {useListProjectsQuery} from "../api/regular/projects.js";
import {useRoute, useRouter} from "vue-router";
import PageLayout from "../components/PageLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import DataList from "../components/DataList.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ProjectCreateModal from "./projects/ProjectCreateModal.vue";
import {useClipboard} from "../composables/clipboard.js";
import {ConfigApiUrl} from "../config.js";
import {ref, computed} from "vue";
import {Copy, FolderOpen} from "lucide-vue-next";

const route = useRoute()
const router = useRouter()
const clipboard = useClipboard()

const tenantSlug = route.params.tenant

const dataQuery = () => useListProjectsQuery(tenantSlug)
const {data} = useListProjectsQuery(tenantSlug)

const projectCount = computed(() => data.value?.items?.length ?? 0)

const registryHost = computed(() => {
  try {
    return new URL(ConfigApiUrl()).host
  } catch {
    return ConfigApiUrl()
  }
})

const loginCommand = computed(() => `docker login ${registryHost.value}`)
const pushCommand = computed(() => `docker push ${registryHost.value}/${tenantSlug}/<project>/<repository>:<tag>`)

const createModal = ref(null)

const openCreateModal = () => {
  createModal.value.open()
}

const navigateToProjectDetails = (project) => {
  router.push({
    name: 'project-details',
    params: {...route.params, project: project.slug}
  })
}

</script>

<template>
  <ProjectCreateModal ref="createModal"/>

  <PageLayout>
    <PageHeader title="Dashboard" subtitle="Overview of your registry.">
      <template #actions>
        <ButtonComponent text="Create Project" @click="openCreateModal"/>
      </template>
    </PageHeader>

    <!-- Stats -->
    <div class="flex flex-row gap-4">
      <div class="flex items-center gap-3 py-3 px-4 rounded-md border
                  not-dark:border-slate-200 dark:border-slate-600
                  not-dark:bg-slate-50 dark:bg-slate-800">
        <FolderOpen :size="20" class="not-dark:text-cyan-700 dark:text-cyan-300"/>
        <span class="text-2xl font-semibold not-dark:text-cyan-800 dark:text-cyan-200">
          {{ projectCount }}
        </span>
        <span class="text-sm font-light not-dark:text-slate-500 dark:text-slate-400">
          Projects
        </span>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="py-4 px-5 rounded-md border flex flex-col gap-3
                not-dark:border-slate-200 dark:border-slate-600
                not-dark:bg-slate-50 dark:bg-slate-800">
      <span class="text-lg font-semibold not-dark:text-cyan-800 dark:text-cyan-200">
        Getting Started
      </span>
      <p class="text-sm not-dark:text-slate-600 dark:text-slate-300">
        Push your first image to the registry.
      </p>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium not-dark:text-slate-500 dark:text-slate-400">
          1. Log in to the registry
        </span>
        <div class="flex flex-row items-center gap-2">
          <code class="flex-1 text-sm px-3 py-2 rounded
                       not-dark:bg-slate-100 dark:bg-slate-900 font-mono">
            {{ loginCommand }}
          </code>
          <ButtonComponent
            text="Copy" variant="secondary" size="sm" adornment="start"
            @click="clipboard.writeText(loginCommand, 'login command')">
            <template #adornment><Copy :size="14"/></template>
          </ButtonComponent>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium not-dark:text-slate-500 dark:text-slate-400">
          2. Push an image
        </span>
        <div class="flex flex-row items-center gap-2">
          <code class="flex-1 text-sm px-3 py-2 rounded
                       not-dark:bg-slate-100 dark:bg-slate-900 font-mono">
            {{ pushCommand }}
          </code>
          <ButtonComponent
            text="Copy" variant="secondary" size="sm" adornment="start"
            @click="clipboard.writeText(pushCommand, 'push command')">
            <template #adornment><Copy :size="14"/></template>
          </ButtonComponent>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div class="flex flex-col gap-2">
      <span class="text-lg font-semibold not-dark:text-cyan-800 dark:text-cyan-200">
        Projects
      </span>
      <DataList :query="dataQuery" :on-click="navigateToProjectDetails">
        <template #row="{item}">
          <div class="flex flex-col">
            <div class="flex flex-row gap-2 justify-between">
              <div class="flex flex-col gap-1">
                <span class="font-semibold">{{ item.displayName }}</span>
                <span class="font-light text-sm">{{ item.slug }}</span>
              </div>
            </div>
            <div>
              <span>{{ item.description }}</span>
            </div>
          </div>
        </template>
        <template #no-data>
          <div class="text-center py-6 not-dark:text-slate-400 dark:text-slate-500">
            No projects yet. Create one to get started.
          </div>
        </template>
      </DataList>
    </div>
  </PageLayout>
</template>

<style scoped>

</style>
