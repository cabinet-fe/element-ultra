import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useNamespace } from '..'
import type { VueWrapper } from '@vue/test-utils'

const TestComp = defineComponent({
  setup() {
    const ns = useNamespace('table')
    return () => (
      <div
        id="testId"
        class={[
          ns.b(), // return ns + block
          ns.b('body'),
          ns.e('content'),
          ns.m('active'),
          ns.be('content', 'active'),
          ns.em('content', 'active'),
          ns.bem('body', 'content', 'active'),
          ns.is('focus'),
          ns.e(), // return empty string
          ns.m(), // return empty string
          ns.be(), // return empty string
          ns.em(), // return empty string
          ns.bem(), // return empty string
          ns.is('hover', undefined), // return empty string
          ns.is('clicked', false), // return empty string
        ]}
      >
        text
      </div>
    )
  },
})

describe('use-locale', () => {
  const Comp = defineComponent({
    setup(_props, { slots }) {
      return () => slots.default?.()
    },
  })
  let wrapper: VueWrapper<InstanceType<typeof Comp>>
  beforeEach(() => {
    wrapper = mount(Comp, {
      slots: { default: () => <TestComp /> },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should provide bem correctly', async () => {
    await nextTick()
    expect(wrapper.find('#testId').classes()).toEqual([
      'ep-table', // b()
      'ep-table-body', // b('body')
      'ep-table__content', // e('content')
      'ep-table--active', // m('active')
      'ep-table-content__active', // be('content', 'active')
      'ep-table__content--active', // em('content', 'active')
      'ep-table-body__content--active', // bem('body', 'content', 'active')
      'is-focus', // is('focus')
    ])
  })
})
