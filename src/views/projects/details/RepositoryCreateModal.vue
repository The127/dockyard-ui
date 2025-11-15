<script setup>

import {useRoute} from "vue-router";
import {useToast} from "../../../composables/toast.js";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useCreateRepositoryMutation} from "../../../api/regular/repositories.js";
import ModalPopup from "../../../components/ModalPopup.vue";
import FormComponent from "../../../components/FormComponent.vue";
import InputComponent from "../../../components/InputComponent.vue";

const route = useRoute()
const toast = useToast()

const modal = ref(null)

const formModel = reactive({
  slug: '',
  description: '',
})

const formRules = {
  slug: {required,},
  description: {},
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.slug = ''
  formModel.description = ''

  v$.value.$reset()

  modal.value.open()
}

defineExpose({
  open,
})

const createRepositoryMutation = useCreateRepositoryMutation(
    route.params.tenant,
    route.params.project,
)

const createRepository = async () => {
  try{
    await createRepositoryMutation.mutateAsync({
      slug: formModel.slug,
      description: formModel.description,
    })

    toast.success('Repository created')
  }catch (e) {
    console.error(e)
    toast.error('Failed to create repository')
  }

  modal.value.close()
}

</script>

<template>
  <ModalPopup ref="modal">
    <FormComponent
        title="Create a repository"
        @submit="createRepository"
        :vuelidate="v$"
        submit-text="Create repository"
    >
      <InputComponent
          label="Slug"
          v-model="v$.slug.$model"
          :vuelidate="v$.slug"
          required
          helper-text="The slug of the repository. Must be unique in the project."
      />
      <InputComponent
          label="Description"
          v-model="v$.description.$model"
          :vuelidate="v$.description"
          helper-text="A short description of the repository."
      />
    </FormComponent>
  </ModalPopup>
</template>

<style scoped>

</style>