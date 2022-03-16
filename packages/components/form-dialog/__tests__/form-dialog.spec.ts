import { mount } from '@vue/test-utils'
import FormDialog from '../src/form-dialog.vue'

const AXIOM = 'Rem is the best girl'

describe('FormDialog.vue', () => {
  test('render test', () => {
    const wrapper = mount(FormDialog, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
