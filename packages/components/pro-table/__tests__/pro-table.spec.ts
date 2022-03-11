import { mount } from '@vue/test-utils'
import ProTable from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('ProTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(ProTable, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
