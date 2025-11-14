<script setup>

import {useRoute} from "vue-router";
import BurgerMenu from "./components/BurgerMenu.vue";

</script>

<template>
  <div class="flex flex-row h-screen w-screen">
    <BurgerMenu/>

    <div class="flex-1 bg-offwhite p-4">
      <div class="">
        TODO: search
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
</style>
