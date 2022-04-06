import { mount } from '@vue/test-utils'
import Page from '../src/page.vue'

const AXIOM = 'Rem is the best girl'

describe('Page.vue', () => {
  test('render test', () => {
    const wrapper = mount(Page, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
