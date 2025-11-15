<script setup>

import {useRoute} from "vue-router";
import {useListTagsQuery} from "../../../../api/regular/tags.js";
import DataList from "../../../../components/DataList.vue";
import {computed} from "vue";

const route = useRoute()

const dataQuery = () => useListTagsQuery(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

const shortDigest = computed(() => {
  return (digest) => {
    if (!digest) {
      return ""
    }

    return digest.substring("sha256:".length, "sha256:".length+12)
  }
})

</script>

<template>
  <DataList :query="dataQuery" :on-click="navigateToRepository">
    <template #row="{item}">
      <div class="flex flex-col">
        <div class="flex flex-row gap-2 justify-between">
          <div class="flex flex-col gap-1">
            <span class="font-semibold">{{ item.name }}</span>
            <span class="font-light text-sm" :title="item.digest">{{ shortDigest(item.digest) }}</span>
          </div>
          <div>
            TODO: stats
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