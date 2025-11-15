<script setup>

import ModalPopup from "../../components/ModalPopup.vue";
import {ref} from "vue";

const modal = ref(null)

const open = () => {
  modal.value.open()
}

defineExpose({
  open,
})

</script>

<template>
  <ModalPopup ref="modal">
    asd
  </ModalPopup>
</template>

<style scoped>

</style>