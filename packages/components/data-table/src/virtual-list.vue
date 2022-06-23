<template>
<component :is="tag">

</component>
</template>

<script lang="ts" setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  }
})
</script>