import { mount } from '@vue/test-utils'
import MultipleFormTest from '../src/main.vue'

const AXIOM = 'Rem is the best girl'

describe('MultipleForm.vue', () => {
  test('render test', () => {
    const wrapper = mount(MultipleFormTest, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
