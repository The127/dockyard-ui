<script setup>

import {computed, useId} from "vue";
import HeadingText from "./HeadingText.vue";
import ButtonComponent from "./ButtonComponent.vue";

const headingId = useId()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  submitText: {
    type: String,
  },
  vuelidate: {
    type: Object,
  },
})

const emit = defineEmits(['submit'])

const submitTextValue = computed(() => props.submitText ?? 'submit')

const onSubmit = async () => {
  if (props.vuelidate) {
    props.vuelidate.$touch()
    if (props.vuelidate.$invalid) {
      return
    }
  }

  emit('submit')
}

</script>

<template>
  <form
      class="flex flex-col flex-wrap gap-5"
      :aria-labelledby="headingId"
      @submit.prevent="onSubmit"
  >
    <slot name="header">
      <HeadingText :id="headingId" level="h3">{{ title }}</HeadingText>
    </slot>

    <slot/>

    <slot name="footer">
      <ButtonComponent type="submit" :text="submitTextValue"/>
    </slot>
  </form>
</template>

<style scoped>

</style>
