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
  required: {
    type: Boolean,
    default: false,
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

const hasError = computed(() => !!props.vuelidate && props.vuelidate.$error)

</script>

<template>
  <div class="flex flex-col gap-1 group">
    <label :for="inputId" class="flex flex-row items-center gap-3" :class="containerClass">
      <div class="relative flex flex-row items-center">
        <input
            :id="inputId"
            type="checkbox"
            v-model="model"
            v-bind="$attrs"
            class="sr-only"
        />
        <span class="slider h-full"></span>
      </div>
      <span class="h-full" :class="{'sr-only': hideLabel}">
        {{ label }}
        <sup v-if="required">*</sup>
      </span>
    </label>

    <span class="text-red-600 text-xs" v-if="hasError">
      {{ vuelidate.$errors[0].$message }}
    </span>
    <span class="not-dark:text-slate-500 dark:text-slate-400 text-xs" v-if="helperText">
      {{ helperText }}
    </span>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  background-color: #ccc;
  border-radius: 28px;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(22px);
}
</style>
