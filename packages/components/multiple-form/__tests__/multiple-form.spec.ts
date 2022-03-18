import { mount } from '@vue/test-utils'
import MultipleForm from '../src/multiple-form.vue'

const AXIOM = 'Rem is the best girl'

describe('MultipleForm.vue', () => {
  test('render test', () => {
    const wrapper = mount(MultipleForm, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
