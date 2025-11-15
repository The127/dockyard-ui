<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import {useRoute} from "vue-router";
import {useGetRepositoryQuery} from "../../../../api/regular/repositories.js";

const route = useRoute()

const { data } = useGetRepositoryQuery(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

</script>

<template>
  <PageLayout>
    <PageHeader
        :title="data?.displayName"
        :subtitle="data?.description ? data.description : 'Manage the repository.'"
    />
  </PageLayout>
</template>

<style scoped>

</style>