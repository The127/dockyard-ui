<script setup>

import {useListProjectsQuery} from "../../api/regular/projects.js";
import {useRoute} from "vue-router";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import DataList from "../../components/DataList.vue";
import {ref} from "vue";
import ProjectCreateModal from "./ProjectCreateModal.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";

const route = useRoute()

const dataQuery = () => useListProjectsQuery(route.params.tenant)

const createModal = ref(null)

const openCreateModal = () => {
  createModal.value.open()
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
    <DataList :query="dataQuery">
      <template #row="{item}">
        {{ item }}
      </template>
    </DataList>
  </PageLayout>
</template>

<style scoped>

</style>