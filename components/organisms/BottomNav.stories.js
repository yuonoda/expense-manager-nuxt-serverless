import { storiesOf } from '@storybook/vue'
import BottomNav from './BottomNav.vue'

storiesOf('organisms | BottomNav', module).add('BottomNav', () => {
  return {
    components: { BottomNav },
    template: `<BottomNav />`,
  }
})
