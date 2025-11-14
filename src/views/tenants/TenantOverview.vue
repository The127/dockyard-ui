<script setup>

import {useListTenantsQuery} from "../../api/admin/tenants.js";

const {data} = useListTenantsQuery()

</script>

<template>
  tenants:
  {{ data }}
</template>

<style scoped>

</style>