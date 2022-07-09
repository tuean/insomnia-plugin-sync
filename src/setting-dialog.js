import { debug } from 'console';
import { h, defineComponent  } from 'vue'


export const dialog_div = {
    // render() {
    //     return  h('div', {
    //         class: 'insomnia-plugin-sync-setting-dialog',
    //     }, [])
    // }
}

const dialog_component = defineComponent({
    setup() {
        return {
            root: dialog_div(),
        }
    }
})
