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
      <div class="flex flex-col">
        <div class="flex flex-row gap-2 justify-between">
          <div class="flex flex-col gap-1">
            <span class="font-semibold">{{ item.displayName }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span>public: {{ item.isPublic }}</span>
            <span>TODO: stats</span>
          </div>
        </div>
        <div>
          <span>{{ item.description }}</span>
        </div>
      </div>
    </template>
  </DataList>
</template>

<style scoped>

</style>