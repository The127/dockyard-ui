<script setup>

import BreadcrumbNavigation from "./BreadcrumbNavigation.vue";
import PageFooter from "./PageFooter.vue";
</script>

<template>
  <div class="flex flex-col gap-4 px-2">
    <BreadcrumbNavigation/>
    <slot/>
    <PageFooter/>
  </div>
</template>

<style scoped>

</style>