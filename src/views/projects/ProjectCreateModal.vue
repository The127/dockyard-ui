<script setup>

import {useToast} from "../../composables/toast.js";
import {reactive, ref, watchEffect} from "vue";
import useVuelidate from "@vuelidate/core";
import {useCreateProjectMutation} from "../../api/regular/projects.js";
import {useRoute} from "vue-router";
import {required} from "@vuelidate/validators";
import ModalPopup from "../../components/ModalPopup.vue";
import FormComponent from "../../components/FormComponent.vue";
import InputComponent from "../../components/InputComponent.vue";
import FormGroup from "../../components/FormGroup.vue";

const route = useRoute()
const toast = useToast()

const modal = ref(null)

const formModel = reactive({
  slug: '',
  name: '',
})

const formRules = {
  slug: {required,},
  name: {required,},
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

const createProjectMutation = useCreateProjectMutation(
    route.params.tenant,
)

const createProject = async () => {
  try {
    await createProjectMutation.mutateAsync({
      slug: formModel.slug,
      displayName: formModel.name,
    })

    toast.success('Project created')
  } catch (e) {
    console.error(e)
    toast.error('Failed to create project')
  }

  modal.value.close()
}

</script>

<template>
  <ModalPopup ref="modal">
    <FormComponent
        title="Create a project"
        @submit="createProject"
        :vuelidate="v$"
        submit-text="Create project"
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