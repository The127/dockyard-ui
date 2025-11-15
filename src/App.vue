<script setup>
import BurgerMenu from "./components/BurgerMenu.vue";

</script>

<template>
  <Suspense>
    <div class="flex flex-row h-screen w-screen not-dark:text-black dark:text-white">
      <BurgerMenu/>

      <div class="flex flex-col gap-2 flex-1 not-dark:bg-offwhite dark:bg-slate-700 p-2">
        <div class="flex items-center h-16 border-b not-dark:border-b-slate-200 dark:border-b-slate-600">
          TODO: search
        </div>
        <router-view/>
      </div>
    </div>
  </Suspense>
</template>

<style scoped>
</style>
