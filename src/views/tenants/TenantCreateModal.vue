<script setup>

import ModalPopup from "../../components/ModalPopup.vue";
import {reactive, ref} from "vue";
import FormComponent from "../../components/FormComponent.vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InputComponent from "../../components/InputComponent.vue";

const modal = ref(null)

const formModel = reactive({
  slug: '',
  name: '',
})

const formRules = {
  slug: { required, },
  name: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.slug = ''
  formModel.name = ''

  v$.value.$reset()

  modal.value.open()
}

defineExpose({
  open,
})

</script>

<template>
  <ModalPopup ref="modal">
    <FormComponent
        title="Create a tenant"
        :vuelidate="v$"
    >
      <InputComponent
          label="Slug"
          v-model="v$.slug.$model"
          :vuelidate="v$.slug"
          required
          helper-text="The slug of the tenant. Must be unique."
      />
      <InputComponent
          label="Name"
          v-model="v$.name.$model"
          :vuelidate="v$.name"
          required
          helper-text="The display name of the tenant."
      />
    </FormComponent>
  </ModalPopup>
</template>

<style scoped>

</style>