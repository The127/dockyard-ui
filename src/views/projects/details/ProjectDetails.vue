<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import TabLayout from "../../../components/TabLayout.vue";
import TabPage from "../../../components/TabPage.vue";
import RepositoriesTab from "./RepositoriesTab.vue";
</script>

<template>
  <PageLayout>
    <PageHeader title="Details" subtitle="Manage the stuff."/>
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