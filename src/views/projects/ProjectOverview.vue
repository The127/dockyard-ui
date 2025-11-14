<script setup>

import {useListProjectsQuery} from "../../api/regular/projects.js";
import {useRoute} from "vue-router";
import PageLayout from "../../components/PageLayout.vue";
import PageHeader from "../../components/PageHeader.vue";

const route = useRoute()

const { data } = useListProjectsQuery(route.params.tenant)

</script>

<template>
  <PageLayout>
    <PageHeader title="Projects" subtitle="Manage your projects."/>
    projects:
    {{ data }}
  </PageLayout>
</template>

<style scoped>

</style>