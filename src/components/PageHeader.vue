<script setup>

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-3xl font-semibold">{{title}}</span>
    <span class="text-md font-light text-slate-400">{{subtitle}}</span>
  </div>
</template>

<style scoped>

</style>