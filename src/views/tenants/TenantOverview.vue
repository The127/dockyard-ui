<script setup>

import {useListTenantsQuery} from "../../api/admin/tenants.js";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import DataList from "../../components/DataList.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";
import TenantCreateModal from "./TenantCreateModal.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

const dataQuery = () => useListTenantsQuery(route.params.tenant)

const createModal = ref(null)

const openCreateModal = () => {
  createModal.value.open()
}

</script>

<template>
  <TenantCreateModal ref="createModal"/>

  <PageLayout>
    <PageHeader title="Tenants" subtitle="Manage the tenants in this installation of dockyard.">
      <template #actions>
        <ButtonComponent text="Create" @click="openCreateModal"/>
      </template>
    </PageHeader>
    <DataList :query="dataQuery">
      <template #row="{item}">
        <div class="flex flex-row gap-2 items-baseline">
          <span class="font-semibold">{{ item.displayName}}</span>
          <span class="font-light text-sm not-dark:text-slate-500 dark:text-slate-400">{{ item.slug}}</span>
        </div>
      </template>
    </DataList>
  </PageLayout>
</template>

<style scoped>

</style>