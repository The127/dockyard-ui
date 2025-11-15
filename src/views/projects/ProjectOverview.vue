<script setup>

import {useListProjectsQuery} from "../../api/regular/projects.js";
import {useRoute} from "vue-router";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import DataList from "../../components/DataList.vue";

const route = useRoute()

const dataQuery = () => useListProjectsQuery(route.params.tenant)

</script>

<template>
  <PageLayout>
    <PageHeader title="Projects" subtitle="Manage your projects."/>
    <DataList :query="dataQuery">
      <template #row="{item}">
        {{ item }}
      </template>
    </DataList>
  </PageLayout>
</template>

<style scoped>

</style>