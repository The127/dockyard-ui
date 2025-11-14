<script setup>

import {useListTenantsQuery} from "../../api/admin/tenants.js";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";

const {data} = useListTenantsQuery()

</script>

<template>
  <PageLayout>
    <PageHeader title="Tenants" subtitle="Manage the tenants in this installation of dockyard."/>
    tenants:
    {{ data }}
  </PageLayout>
</template>

<style scoped>

</style>