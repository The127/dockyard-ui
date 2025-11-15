<script setup>

import {useListProjectsQuery} from "../../api/regular/projects.js";
import {useRoute, useRouter} from "vue-router";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import DataList from "../../components/DataList.vue";
import {ref} from "vue";
import ProjectCreateModal from "./ProjectCreateModal.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";

const route = useRoute()
const router = useRouter()

const dataQuery = () => useListProjectsQuery(route.params.tenant)

const createModal = ref(null)

const openCreateModal = () => {
  createModal.value.open()
}

const navigateToProjectDetails = (project) => {
  router.push({
    name: 'project-details',
    params: {...route.params, project: project.slug,}
  })
}

</script>

<template>
  <ProjectCreateModal ref="createModal"/>

  <PageLayout>
    <PageHeader title="Projects" subtitle="Manage your projects.">
      <template #actions>
        <ButtonComponent text="Create" @click="openCreateModal"/>
      </template>
    </PageHeader>
    <DataList :query="dataQuery" :on-click="navigateToProjectDetails">
      <template #row="{item}">
        <div class="flex flex-col">
          <div class="flex flex-row gap-2 justify-between">
            <div class="flex flex-col gap-1">
              <span class="font-semibold">{{ item.displayName }}</span>
              <span class="font-light text-sm">{{ item.slug }}</span>
            </div>
            <div>
              TODO: stats
            </div>
          </div>
          <div>
            <span class="">{{ item.description }}</span>
          </div>
        </div>
      </template>
    </DataList>
  </PageLayout>
</template>

<style scoped>

</style>