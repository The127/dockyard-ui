<script setup>

import {useListProjectsQuery} from "../../api/regular/projects.js";

const { data } = useListProjectsQuery("raccoons")

</script>

<template>
  projects:
  {{ data }}
</template>

<style scoped>

</style>