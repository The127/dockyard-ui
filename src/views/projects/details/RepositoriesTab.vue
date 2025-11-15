<script setup>

import {useRoute} from "vue-router";
import {useListRepositoriesQuery} from "../../../api/regular/repositories.js";
import DataList from "../../../components/DataList.vue";

const route = useRoute()

const dataQuery = () => useListRepositoriesQuery(route.params.tenant, route.params.project)

</script>

<template>
  <DataList :query="dataQuery">
    <template #row="{item}">
      {{ item }}
    </template>
  </DataList>
</template>

<style scoped>

</style>