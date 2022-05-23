<script lang="ts">
import { slotsRenderProps } from './slots-render'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElSlotsRender',
  props: slotsRenderProps,
  setup(props) {
    return () => props.nodes
  }
})
</script>
