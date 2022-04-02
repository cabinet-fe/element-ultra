import { mount } from '@vue/test-utils'
import Action from '../src/action.vue'

const AXIOM = 'Rem is the best girl'

describe('Action.vue', () => {
  test('render test', () => {
    const wrapper = mount(Action, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
