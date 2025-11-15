<script setup>

import {useRoute, useRouter} from "vue-router";
import {useListRepositoriesQuery} from "../../../api/regular/repositories.js";
import DataList from "../../../components/DataList.vue";

const route = useRoute()
const router = useRouter()

const dataQuery = () => useListRepositoriesQuery(route.params.tenant, route.params.project)

const navigateToRepository = (repository) => {
  router.push({
    name: 'repository-details',
    params: {...route.params, repository: repository.slug,}
  })
}

</script>

<template>
  <DataList :query="dataQuery" :on-click="navigateToRepository">
    <template #row="{item}">
      {{ item }}
    </template>
  </DataList>
</template>

<style scoped>

</style>