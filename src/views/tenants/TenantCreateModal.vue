<script setup>

import ModalPopup from "../../components/ModalPopup.vue";
import {reactive, ref} from "vue";
import FormComponent from "../../components/FormComponent.vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InputComponent from "../../components/InputComponent.vue";
import {useCreateTenantMutation} from "../../api/admin/tenants.js";
import {useToast} from "../../composables/toast.js";
import FormGroup from "../../components/FormGroup.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const toast = useToast()

const modal = ref(null)

const formModel = reactive({
  slug: '',
  name: '',
  oidcClient: '',
  oidcIssuer: '',
})

const formRules = {
  slug: {required,},
  name: {required,},
  oidcClient: {required,},
  oidcIssuer: {required,},
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.slug = ''
  formModel.name = ''
  formModel.oidcClient = ''
  formModel.oidcIssuer = ''

  v$.value.$reset()

  modal.value.open()
}

defineExpose({
  open,
})

const createTenantMutation = useCreateTenantMutation(
    route.params.tenant,
)

const createTenant = async () => {
  try {
    await createTenantMutation.mutateAsync({
      slug: formModel.slug,
      displayName: formModel.name,
      oidcClient: formModel.oidcClient,
      oidcIssuer: formModel.oidcIssuer,
    })

    toast.success('Tenant created')
  } catch (e) {
    console.error(e)
    toast.error('Failed to create tenant')
  }

  modal.value.close()
}

</script>

<template>
  <ModalPopup ref="modal">
    <FormComponent
        title="Create a tenant"
        @submit="createTenant"
        :vuelidate="v$"
        submit-text="Create tenant"
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
      <FormGroup title="OIDC">
        <InputComponent
            label="Client"
            v-model="v$.oidcClient.$model"
            :vuelidate="v$.oidcClient"
            required
            helper-text="The oidc client id of the tenant."
        />
        <InputComponent
            label="Issuer"
            v-model="v$.oidcIssuer.$model"
            :vuelidate="v$.oidcIssuer"
            required
            helper-text="The oidc issuer url of the tenant."
        />
      </FormGroup>
    </FormComponent>
  </ModalPopup>
</template>

<style scoped>

</style>