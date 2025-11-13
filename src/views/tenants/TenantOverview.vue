<script setup>

import {useGetTenantQuery, useListTenantsQuery} from "../../api/tenants.js";

const { data } = useListTenantsQuery()

</script>

<template>
  tenants:
  {{ data }}
</template>

<style scoped>

</style>