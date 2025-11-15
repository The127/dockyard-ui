<script setup>

import {useListTenantsQuery} from "../../api/admin/tenants.js";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";
import DataList from "../../components/DataList.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";
import TenantCreateModal from "./TenantCreateModal.vue";
import {ref} from "vue";

const dataQuery = () => useListTenantsQuery()

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
        <ButtonComponent variant="special" text="Create" @click="openCreateModal"/>
      </template>
    </PageHeader>
    <DataList :query="dataQuery">
      <template #row="{item}">
        {{ item }}
      </template>
    </DataList>
  </PageLayout>
</template>

<style scoped>

</style>