<script setup>

defineProps({
  to: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link :to="to" class="p-2 rounded-md flex flex-row gap-3 hover:inset-shadow-2xs hover:bg-slate-200 hover:shadow-none" exact-active-class="bg-offwhite shadow-md text-cyan-800">
    <slot/>
  </router-link>
</template>

<style scoped>

</style>