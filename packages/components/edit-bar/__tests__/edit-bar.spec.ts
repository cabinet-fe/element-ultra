import { mount } from '@vue/test-utils'
import EditBar from '../src/edit-bar.vue'

const AXIOM = 'Rem is the best girl'

describe('EditBar.vue', () => {
  test('render test', () => {
    const wrapper = mount(EditBar, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
