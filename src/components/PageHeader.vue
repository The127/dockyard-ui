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
  <div class="flex flex-row justify-between items-center">
    <div class="flex flex-col gap-1">
      <span class="text-3xl font-semibold not-dark:text-cyan-800 dark:text-cyan-200">
        {{title}}
      </span>
      <span class="text-xs font-light not-dark:text-slate-500'dark:text-slate-400">
        {{subtitle}}
      </span>
    </div>
    <div>
      <slot name="actions"/>
    </div>
  </div>
</template>

<style scoped>

</style>