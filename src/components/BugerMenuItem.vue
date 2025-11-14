<script setup>

defineProps({
  to: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link
      :to="to"
      class="p-2 rounded-md flex flex-row gap-3 hover:inset-shadow-2xs not-dark:hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-none"
      exact-active-class="not-dark:bg-offwhite dark:bg-slate-900 shadow-md not-dark:text-cyan-800 dark:text-cyan-200"
  >
    <slot/>
  </router-link>
</template>

<style scoped>

</style>