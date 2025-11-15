<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import TabLayout from "../../../components/TabLayout.vue";
import TabPage from "../../../components/TabPage.vue";
import RepositoriesTab from "./RepositoriesTab.vue";
import ButtonComponent from "../../../components/ButtonComponent.vue";
import {computed, ref} from "vue";
import RepositoryCreateModal from "./RepositoryCreateModal.vue";
import {useRoute} from "vue-router";
import {useGetProjectQuery} from "../../../api/regular/projects.js";

const route = useRoute()

const { data } = useGetProjectQuery(route.params.tenant, route.params.project)

const createModal = ref(null)

const openCreateModal = () => {
  createModal.value.open()
}

</script>

<template>
  <RepositoryCreateModal ref="createModal"/>

  <PageLayout>
    <PageHeader
        :title="data?.displayName"
        :subtitle="data?.description ? data.description : 'Manage the project.'"
    >
      <template #actions>
        <ButtonComponent text="Create" @click="openCreateModal"/>
      </template>
    </PageHeader>
    <TabLayout>
      <TabPage title="Repositories" name="repos">
        <RepositoriesTab/>
      </TabPage>
      <TabPage title="Settings" name="settings">
        TODO
      </TabPage>
    </TabLayout>
  </PageLayout>
</template>

<style scoped>

</style>