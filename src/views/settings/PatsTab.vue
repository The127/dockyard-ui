<script setup>

import {useRoute} from "vue-router";
import {useListPatsQuery} from "../../api/regular/pats.js";
import DataList from "../../components/DataList.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";
import PatCreateModal from "./PatCreateModal.vue";
import {ref} from "vue";

const route = useRoute()

const createModal = ref(null)

const dataQuery = () => useListPatsQuery(route.params.tenant)

const openCreateModal = () => {
  createModal.value.open()
}

</script>

<template>
  <PatCreateModal ref="createModal"/>

  <div class="flex flex-col gap-3 justify-between">
    <p>
      PATs (Personal Access Tokens) are a form of authentication.
      You use them to login via docker or podman against dockyard for push or pull
      operations (e.g. via <code>podman login</code>).
    </p>
    <div>
      <ButtonComponent size="md" text="Create a PAT" @click="openCreateModal"/>
    </div>
  </div>
  <DataList :query="dataQuery">
    <template #row="{item}">
      <div>
        {{ item.displayName }}
      </div>
    </template>
  </DataList>
</template>

<style scoped>

</style>