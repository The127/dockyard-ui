<script setup>

import {useRoute} from "vue-router";
import {useToast} from "../../composables/toast.js";
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {useCreatePatMutation} from "../../api/regular/pats.js";
import ModalPopup from "../../components/ModalPopup.vue";
import FormComponent from "../../components/FormComponent.vue";
import InputComponent from "../../components/InputComponent.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";
import {useClipboard} from "../../composables/clipboard.js";
import {Terminal} from "lucide-vue-next";

const route = useRoute()
const toast = useToast()
const clipboard = useClipboard()

const modal = ref(null)

const token = ref(null)

const formModel = reactive({
  displayName: '',
})

const formRules = {
  displayName: {},
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  token.value = null

  formModel.displayName = ''

  v$.value.$reset()

  modal.value.open()
}

defineExpose({
  open,
})

const createPatMutation = useCreatePatMutation(route.params.tenant)

const createPat = async () => {
  try {
    const response = await createPatMutation.mutateAsync({
      displayName: formModel.displayName,
    })

    toast.success('PAT created')
    token.value = response.token
  } catch (e) {
    console.error(e)
    toast.error('Failed to create PAT')

    modal?.value?.close()
  }
}

const copyAndClose = async () => {
  clipboard.writeText(token.value, 'PAT')
  token.value = null
  modal?.value?.close()
}

</script>

<template>
  <ModalPopup ref="modal">
    <FormComponent
        v-if="!token"
        title="Create a PAT"
        @submit="createPat"
        :vuelidate="v$"
        :submit-text="'Create PAT'"
    >
      <InputComponent
          label="Display Name"
          v-model="v$.displayName.$model"
          :vuelidate="v$.displayName"
          helper-text="The name of the pat."
      />
    </FormComponent>
    <div
        v-else
        class="flex flex-col gap-3"
    >
      <span>This is the only time we will show you your PAT. Make sure to save it securely somewhere.</span>
      <div class="p-1 rounded-md not-dark:bg-slate-100 dark:bg-slate-800">
        <Terminal class="size-6"/>
        <code class="w-full break-all">
          {{ token }}
        </code>
      </div>
      <ButtonComponent text="Copy and close" @click="copyAndClose"/>
    </div>
  </ModalPopup>
</template>

<style scoped>

</style>