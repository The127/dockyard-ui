<script setup>

import {useRoute} from "vue-router";
import {useToast} from "../../../../composables/toast.js";
import {useGetRepositoryReadmeQuery, useUpdateRepositoryReadmeMutation} from "../../../../api/regular/repositories.js";
import {MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {computed, ref, useId} from "vue";
import ButtonComponent from "../../../../components/ButtonComponent.vue";
import {Copy, Pencil} from "lucide-vue-next";
import {useDark} from "@vueuse/core";
import {useClipboard} from "../../../../composables/clipboard.js";
import {ConfigApiUrl} from "../../../../config.js";

const route = useRoute()
const toast = useToast()
const clipboard = useClipboard()

const isDark = useDark()

const selectedTool = ref('docker')
const tools = ['docker', 'podman']

const registryHost = computed(() => {
  try {
    return new URL(ConfigApiUrl()).host
  } catch {
    return ConfigApiUrl()
  }
})

const imagePath = computed(() =>
  `${registryHost.value}/${route.params.project}/${route.params.repository}`
)

const loginCommand = computed(() => `${selectedTool.value} login ${registryHost.value}`)
const pullCommand = computed(() => `${selectedTool.value} pull ${imagePath.value}:<tag>`)
const pushCommand = computed(() => `${selectedTool.value} push ${imagePath.value}:<tag>`)

const editorId = useId()
const viewerId = useId()

defineProps({
  data: {
    required: true,
  },
})

const editing = ref(false)
const content = ref('#test')

const {data: readmeData} = useGetRepositoryReadmeQuery(
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
  if (!readmeData?.value?.contentBase64) {
    content.value = ""
  } else {
    content.value = decodedContent(readmeData.value.contentBase64)
  }

  editing.value = true
}

const decodedContent = (contentBase64) => {
  console.log(contentBase64)
  return new TextDecoder().decode(Uint8Array.fromBase64(contentBase64))
}

const editorTheme = computed(() => {
  return isDark.value ? "dark" : "light"
})

</script>

<template>
  <!-- Repository meta -->
  <div class="flex flex-row gap-4 text-sm not-dark:text-slate-500 dark:text-slate-400">
    <span>
      <span class="font-medium not-dark:text-slate-700 dark:text-slate-300">Visibility: </span>
      {{ data.isPublic ? 'Public' : 'Private' }}
    </span>
    <span>
      <span class="font-medium not-dark:text-slate-700 dark:text-slate-300">Last updated: </span>
      {{ new Date(data.updatedAt).toLocaleString() }}
    </span>
  </div>

  <!-- Quick commands -->
  <div class="py-4 px-5 rounded-md border flex flex-col gap-3
              not-dark:border-slate-200 dark:border-slate-600
              not-dark:bg-slate-50 dark:bg-slate-800">
    <div class="flex flex-row items-center justify-between">
      <span class="text-base font-semibold not-dark:text-cyan-800 dark:text-cyan-200">
        Quick commands
      </span>
      <div class="flex flex-row gap-1">
        <ButtonComponent
          v-for="tool in tools"
          :key="tool"
          :variant="selectedTool === tool ? 'secondary' : 'ghost'"
          size="sm"
          :text="tool"
          @click="selectedTool = tool"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium not-dark:text-slate-500 dark:text-slate-400">Login</span>
        <div class="flex flex-row items-center gap-2">
          <code class="flex-1 text-sm px-3 py-2 rounded font-mono
                       not-dark:bg-slate-100 dark:bg-slate-900">{{ loginCommand }}</code>
          <ButtonComponent text="Copy" variant="secondary" size="sm" adornment="start"
            @click="clipboard.writeText(loginCommand, 'login command')">
            <template #adornment><Copy :size="14"/></template>
          </ButtonComponent>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium not-dark:text-slate-500 dark:text-slate-400">Pull</span>
        <div class="flex flex-row items-center gap-2">
          <code class="flex-1 text-sm px-3 py-2 rounded font-mono
                       not-dark:bg-slate-100 dark:bg-slate-900">{{ pullCommand }}</code>
          <ButtonComponent text="Copy" variant="secondary" size="sm" adornment="start"
            @click="clipboard.writeText(pullCommand, 'pull command')">
            <template #adornment><Copy :size="14"/></template>
          </ButtonComponent>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium not-dark:text-slate-500 dark:text-slate-400">Push</span>
        <div class="flex flex-row items-center gap-2">
          <code class="flex-1 text-sm px-3 py-2 rounded font-mono
                       not-dark:bg-slate-100 dark:bg-slate-900">{{ pushCommand }}</code>
          <ButtonComponent text="Copy" variant="secondary" size="sm" adornment="start"
            @click="clipboard.writeText(pushCommand, 'push command')">
            <template #adornment><Copy :size="14"/></template>
          </ButtonComponent>
        </div>
      </div>
    </div>
  </div>

  <template v-if="editing">
    <MdEditor class="rounded-md" :id="editorId" v-model="content" language="en-US" :theme="editorTheme"/>
    <div class="flex flex-row gap-2">
      <ButtonComponent size="sm" text="Save" @click="onSaveReadme"/>
      <ButtonComponent size="sm" variant="secondary" text="Cancel" @click="onCancel"/>
    </div>
  </template>
  <template v-else-if="readmeData?.contentBase64">
    <MdPreview
        class="rounded-md px-4"
        :id="viewerId"
        :modelValue="decodedContent(readmeData.contentBase64)"
        language="en-US"
        :theme="editorTheme"
    />
    <ButtonComponent variant="link" size="sm" text="Edit" @click="onEdit">
      <template #adornment>
        <Pencil class="size-4"/>
      </template>
    </ButtonComponent>
  </template>
  <div v-else class="flex flex-col gap-2 items-center">
    <span class="not-dark:text-slate-500 dark:text-slate-400">
      This repository does not have a README yet.
    </span>
    <ButtonComponent variant="link" size="sm" text="Create a README" @click="onEdit">
      <template #adornment>
        <Pencil class="size-4"/>
      </template>
    </ButtonComponent>
  </div>
</template>

<style scoped>

</style>