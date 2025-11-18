<script setup>

import {useRoute} from "vue-router";
import {reactive, ref, toValue} from "vue";
import useVuelidate from "@vuelidate/core";
import {usePatchRepositoryMutation} from "../../../../api/regular/repositories.js";
import FormComponent from "../../../../components/FormComponent.vue";
import InputComponent from "../../../../components/InputComponent.vue";
import CheckBox from "../../../../components/CheckBox.vue";
import ModalPopup from "../../../../components/ModalPopup.vue";
import {useToast} from "../../../../composables/toast.js";

const route = useRoute()
const toast = useToast()

const modal = ref(null)

const title = ref(null)

const formModel = reactive({
  description: '',
  isPublic: false,
})

const formRules = {
  description: {},
  isPublic: {},
}

const v$ = useVuelidate(formRules, formModel)

const open = (data) => {
  title.value = `Edit ${toValue(data).displayName}`

  formModel.description = toValue(data).description
  formModel.isPublic = toValue(data).isPublic

  v$.value.$reset()

  modal.value.open()
}

defineExpose({
  open,
})

const patchRepositoryMutation = usePatchRepositoryMutation(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

const patchRepository = async () => {
  try{
    await patchRepositoryMutation.mutateAsync({
      description: formModel.description,
      isPublic: formModel.isPublic,
    })

    toast.success('Repository updated')
  }catch(e){
    console.error(e)
    toast.error('Failed to update repository')
  }

  modal?.value?.close()
}

</script>

<template>
  <ModalPopup ref="modal">
    <FormComponent
        :title="title"
        @submit="patchRepository"
        :vuelidate="v$"
        submit-text="Update repository"
    >
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