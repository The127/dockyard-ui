<script setup>

import {useRoute} from "vue-router";
import {useToast} from "../../../../composables/toast.js";
import {useGetRepositoryReadmeQuery, useUpdateRepositoryReadmeMutation} from "../../../../api/regular/repositories.js";
import {MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {computed, markRaw, ref, useId} from "vue";
import ButtonComponent from "../../../../components/ButtonComponent.vue";
import { Pencil } from "lucide-vue-next";
import {useDark} from "@vueuse/core";

const route = useRoute()
const toast = useToast()

const isDark = useDark()

const editorId = useId()
const viewerId = useId()

const editing = ref(false)
const content = ref('#test')

const {data} = useGetRepositoryReadmeQuery(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

const updateReadmeMutation = useUpdateRepositoryReadmeMutation(
    route.params.tenant,
    route.params.project,
    route.params.repository,
)

const onSaveReadme = async () => {
  try {
    const contentBase64 = new TextEncoder().encode(content.value).toBase64()

    await updateReadmeMutation.mutateAsync({
      contentBase64: contentBase64,
    })

    toast.success("Saved repository README.")
    editing.value = false
  } catch (e) {
    console.error(e)
    toast.error("Failed to save README.")
  }
}

const onCancel = () => {
  editing.value = false
}

const onEdit = () => {
  if (!data?.value?.contentBase64) {
    content.value = ""
  }else{
    content.value = decodedContent(data.value.contentBase64)
  }

  editing.value = true
}

const decodedContent = (contentBase64) => {
  return new TextDecoder().decode(Uint8Array.fromBase64(contentBase64))
}

const editorTheme = computed(() => {
  return isDark.value ? "dark" : "light"
})

</script>

<template>
  <template v-if="editing">
    <MdEditor  class="rounded-md" :id="editorId" v-model="content" language="en-US" :theme="editorTheme"/>
    <div class="flex flex-row gap-2">
      <ButtonComponent size="sm" text="Save" @click="onSaveReadme"/>
      <ButtonComponent size="sm" variant="secondary" text="Cancel" @click="onCancel"/>
    </div>
  </template>
  <template v-else-if="data?.contentBase64">
    <MdPreview class="rounded-md" :id="viewerId" :modelValue="decodedContent(data.contentBase64)" language="en-US" :theme="editorTheme"/>
    <ButtonComponent variant="link" size="sm" text="Edit" @click="onEdit">
      <template #adornment>
        <Pencil class="size-4"/>
      </template>
    </ButtonComponent>
  </template>
  <div v-else class="flex flex-col gap-2 items-center">
    <span class="not-dark:text-slate-500 dark:text-slate-400">This repository does not have a README yet.</span>
    <ButtonComponent variant="link" size="sm" text="Create a README" @click="onEdit">
      <template #adornment>
        <Pencil class="size-4"/>
      </template>
    </ButtonComponent>
  </div>
</template>

<style scoped>

</style>