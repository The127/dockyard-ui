<script setup>

import {useToast} from "../../composables/toast.js";
import {reactive, ref, watchEffect} from "vue";
import useVuelidate from "@vuelidate/core";
import {useCreateProjectMutation} from "../../api/regular/projects.js";
import {useRoute, useRouter} from "vue-router";
import {required} from "@vuelidate/validators";
import ModalPopup from "../../components/ModalPopup.vue";
import FormComponent from "../../components/FormComponent.vue";
import InputComponent from "../../components/InputComponent.vue";

const route = useRoute()
const router = useRouter()
const toast = useToast()

const modal = ref(null)

const formModel = reactive({
  slug: '',
  name: '',
  description: '',
})

const formRules = {
  slug: {required,},
  name: {},
  description: {},
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.slug = ''
  formModel.name = ''
  formModel.description = ''

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
      description: formModel.description,
    })

    toast.success('Project created')

    await router.push({
      name: 'project-details',
      params: {...route.params, project: formModel.slug},
    })
  } catch (e) {
    console.error(e)
    toast.error('Failed to create project')
  }

  modal?.value?.close()
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
          helper-text="The slug of the project. Must be unique."
      />
      <InputComponent
          label="Name"
          v-model="v$.name.$model"
          :vuelidate="v$.name"
          helper-text="The display name of the project."
      />
      <InputComponent
          label="Description"
          v-model="v$.description.$model"
          :vuelidate="v$.description"
          helper-text="A short description of the project."
      />
    </FormComponent>
  </ModalPopup>
</template>

<style scoped>

</style>