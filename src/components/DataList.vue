<script setup>

const props = defineProps({
  query: {
    required: true,
  },
  idSelector: {
    type: Function,
    default: x => x.id ?? x,
  },
  onClick: {
    type: Function,
    default: null,
  },
})

const { data, isPending, isFetching, } = props.query()

</script>

<template>
  <div>
    <template v-if="!!data">
      <template v-if="data?.items?.length === 0">
        <slot name="no-data">
          <span class="not-dark:text-slate-400 dark:text-slate-500">
            No data&hellip;
          </span>
        </slot>
      </template>
      <template v-else>
        <div
            v-for="item in data.items"
            :key="props.idSelector(item)"
            class="py-2 px-4 rounded-md border not-dark:border-slate-200 dark:border-slate-600 not-dark:bg-slate-50 dark:bg-slate-800"
            :class="{'cursor-pointer not-dark:hover:bg-slate-100 dark:hover:bg-slate-900': !!onClick}"
            @click="!!onClick && onClick(item)"
        >
          <slot name="row" :item="item"/>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>