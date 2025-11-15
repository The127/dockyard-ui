<script setup>

import {useListTenantsQuery} from "../../api/admin/tenants.js";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import DataList from "../../components/DataList.vue";

const dataQuery = () => useListTenantsQuery()

</script>

<template>
  <PageLayout>
    <PageHeader title="Tenants" subtitle="Manage the tenants in this installation of dockyard.">
      <template #actions>
        asd
      </template>
    </PageHeader>
    <DataList :query="dataQuery" :on-click="() => {}">
      <template #row="{item}">
        {{ item }}
      </template>
    </DataList>
  </PageLayout>
</template>

<style scoped>

</style>