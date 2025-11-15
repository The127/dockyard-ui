<script setup>

import BreadcrumbNavigation from "./BreadcrumbNavigation.vue";
</script>

<template>
  <div class="flex flex-col gap-4 px-2">
    <BreadcrumbNavigation/>
    <slot/>
  </div>
</template>

<style scoped>

</style>