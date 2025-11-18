<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import {useRoute} from "vue-router";
import {useGetRepositoryQuery} from "../../../../api/regular/repositories.js";
import TabLayout from "../../../../components/TabLayout.vue";
import TabPage from "../../../../components/TabPage.vue";
import TagsTab from "./TagsTab.vue";
import OverviewTab from "./OverviewTab.vue";
import {ref} from "vue";
import ButtonComponent from "../../../../components/ButtonComponent.vue";
import RegistryEditModal from "./RegistryEditModal.vue";

const route = useRoute()

const { data } = useGetRepositoryQuery(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

const editModal = ref(null)

const openEditModal = () => {
  editModal.value.open(data)
}

</script>

<template>
  <RegistryEditModal ref="editModal"/>

  <PageLayout>
    <PageHeader
        :title="data?.displayName"
        :subtitle="data?.description ? data.description : 'Manage the repository.'"
    >
      <template #actions>
        <ButtonComponent text="Update" @click="openEditModal"/>
      </template>
    </PageHeader>
    <TabLayout>
      <TabPage title="Overview" name="overview">
        <OverviewTab :data="data"/>
      </TabPage>
      <TabPage title="Tags" name="tags">
        <TagsTab/>
      </TabPage>
    </TabLayout>
  </PageLayout>
</template>

<style scoped>

</style>