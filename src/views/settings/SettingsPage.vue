<script setup>

import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import TabLayout from "../../components/TabLayout.vue";
import TabPage from "../../components/TabPage.vue";
import PatsTab from "./PatsTab.vue";
</script>

<template>
  <PageLayout>
    <PageHeader title="Settings" subtitle="Configure your personal dockyard settings."/>
    <TabLayout>
      <TabPage title="PATs" name="pats">
        <PatsTab/>
      </TabPage>
    </TabLayout>
  </PageLayout>
</template>

<style scoped>

</style>