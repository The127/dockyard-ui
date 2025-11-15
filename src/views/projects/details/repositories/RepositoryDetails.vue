<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import {useRoute} from "vue-router";
import {useGetRepositoryQuery} from "../../../../api/regular/repositories.js";
import TabLayout from "../../../../components/TabLayout.vue";
import TabPage from "../../../../components/TabPage.vue";
import TagsTab from "./TagsTab.vue";

const route = useRoute()

const { data } = useGetRepositoryQuery(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

</script>

<template>
  <PageLayout>
    <PageHeader
        :title="data?.displayName"
        :subtitle="data?.description ? data.description : 'Manage the repository.'"
    />
    <TabLayout>
      <TabPage title="Overview" name="overview">
        TODO: overview
      </TabPage>
      <TabPage title="Tags" name="tags">
        <TagsTab/>
      </TabPage>
    </TabLayout>
  </PageLayout>
</template>

<style scoped>

</style>