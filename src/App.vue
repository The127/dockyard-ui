<script setup>
import BurgerMenu from "./components/BurgerMenu.vue";

</script>

<template>
  <Suspense>
    <div class="flex flex-row h-screen w-screen not-dark:text-black dark:text-white">
      <BurgerMenu/>

      <div class="flex-1 not-dark:bg-offwhite dark:bg-slate-700 p-4">
        <div class="">
          TODO: search
        </div>
        <router-view/>
      </div>
    </div>
  </Suspense>
</template>

<style scoped>
</style>
