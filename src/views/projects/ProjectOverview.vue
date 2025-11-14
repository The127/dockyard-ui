<script setup>

import {useListProjectsQuery} from "../../api/regular/projects.js";
import {useRoute} from "vue-router";

const route = useRoute()

const { data } = useListProjectsQuery(route.params.tenant)

</script>

<template>
  projects:
  {{ data }}
</template>

<style scoped>

</style>