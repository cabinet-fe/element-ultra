<template>
  <tr :class="ns.e('footer')">
    <td>合计</td>
    <td v-for="column of columns.slice(1)">
      {{ column }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { tableToken } from './token'

const { columns, ns } = inject(tableToken)!
</script>
