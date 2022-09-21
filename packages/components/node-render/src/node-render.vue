<script lang="ts">
import { nodeRenderProps } from './node-render'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElNodeRender',
  props: nodeRenderProps,
  setup(props) {
    return () => props.nodes
  }
})
</script>
