<script setup>

import DockyardIcon from "./DockyardIcon.vue";
</script>

<template>
  <div class="border-t not-dark:border-t-slate-200 dark:border-t-slate-600 py-4">
    <div class="flex flex-row justify-end gap-1 not-dark:text-slate-500 dark:text-slate-400">
      Powered by
      <a
          href="https://github.com/The127/dockyard"
          class="flex flex-row gap-1 items-center not-dark:text-cyan-600 dark:text-cyan-400 hover:not-dark:text-cyan-800 hover:dark:text-cyan-300"
      >
        <DockyardIcon class="size-4"/> dockyard
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>