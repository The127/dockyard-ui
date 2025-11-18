<script setup>

import {useRoute, useRouter} from "vue-router";
import {useToast} from "../../../composables/toast.js";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useCreateRepositoryMutation} from "../../../api/regular/repositories.js";
import ModalPopup from "../../../components/ModalPopup.vue";
import FormComponent from "../../../components/FormComponent.vue";
import InputComponent from "../../../components/InputComponent.vue";
import CheckBox from "../../../components/CheckBox.vue";

const route = useRoute()
const router = useRouter()
const toast = useToast()

const modal = ref(null)

const formModel = reactive({
  slug: '',
  description: '',
  isPublic: false,
})

const formRules = {
  slug: {required,},
  description: {},
  isPublic: {},
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
      isPublic: formModel.isPublic,
    })

    toast.success('Repository created')

    await router.push({
      name: 'repository-details',
      params: {...route.params, repository: formModel.slug,}
    })
  }catch (e) {
    console.error(e)
    toast.error('Failed to create repository')
  }

  modal?.value?.close()
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
      <CheckBox
          label="Public repository"
          v-model="v$.isPublic.$model"
          :vuelidate="v$.isPublic"
          helper-text="If set to true the repository can be pulled without project access."
      />
    </FormComponent>
  </ModalPopup>
</template>

<style scoped>

</style>