<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import TabLayout from "../../../components/TabLayout.vue";
import TabPage from "../../../components/TabPage.vue";
import RepositoriesTab from "./RepositoriesTab.vue";
import ButtonComponent from "../../../components/ButtonComponent.vue";
import {ref} from "vue";
import RepositoryCreateModal from "./RepositoryCreateModal.vue";

const createModal = ref(null)

const openCreateModal = () => {
  createModal.value.open()
}

</script>

<template>
  <RepositoryCreateModal ref="createModal"/>

  <PageLayout>
    <PageHeader title="Details" subtitle="Manage the stuff.">
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