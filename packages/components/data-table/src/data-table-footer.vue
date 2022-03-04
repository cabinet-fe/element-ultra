<!-- 表格的底部, 用来做固定的表尾合计 -->
<template>
<section :class="ns.e('footer')">

</section>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-pro/hooks'

const ns = useNamespace('data-table')
</script>