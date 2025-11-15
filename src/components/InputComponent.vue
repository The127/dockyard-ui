<script setup>

import {computed, useId} from "vue";

defineOptions({
  inheritAttrs: false,
})

const inputId = useId()

const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
  vuelidate: {
    type: Object,
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email'].includes(value),
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  helperText: {
    type: String,
    default: null,
  },
  containerClass: {
    type: String,
    default: null,
  },
})

const placeholderValue = computed(() => props.placeholder ?? props.label)
const hasError = computed(() => !!props.vuelidate && props.vuelidate.$error)

</script>

<template>
  <div class="flex flex-col gap-1 group" :class="containerClass">
    <div class="flex flex-row justify-between text-sm">
      <label
          :for="inputId"
          class="not-dark:text-slate-700 dark:text-slate-200 not-dark:group-focus-within:text-slate-900 dark:group-focus-within:text-offwhite font-bold"
          :class="{'sr-only': hideLabel}"
      >
        {{ label }}
        <sup v-if="required">*</sup>
      </label>
      <slot name="action"/>
    </div>
    <input
        :type="type"
        class="border not-dark:border-slate-900 dark:border-offwhite p-2 rounded-md not-dark:bg-slate-50 dark:bg-slate-800"
        :class="{'has-error': hasError,}"
        :label="label"
        v-model="model"
        :id="inputId"
        :placeholder="placeholderValue"
        v-bind="$attrs"
    />
    <span class="not-dark:text-red-700 dark:text-red-300 text-xs" v-if="hasError">
      {{ vuelidate.$errors[0].$message }}
    </span>
    <span class="not-dark:text-slate-500 dark:text-slate-400 text-xs" v-if="helperText">
      {{ helperText }}
    </span>
  </div>
</template>

<style scoped>

</style>