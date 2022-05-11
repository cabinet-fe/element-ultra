import { mount } from '@vue/test-utils'
import GridInput from '../src/grid-input.vue'

const AXIOM = 'Rem is the best girl'

describe('GridInput.vue', () => {
  test('render test', () => {
    const wrapper = mount(GridInput, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
