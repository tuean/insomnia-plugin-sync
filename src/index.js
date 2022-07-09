
import * as WorkSpace from './WorkSpace'
import { dialog_div } from './setting-dialog'
import { createApp } from 'vue';
import SettingDialog from './SettingDialog.vue'

module.exports.workspaceActions = [
    {
        label: 'sync - setting',
        icon: 'fa-cog',
        action: async (context, models) => {
            console.log(context)
            console.log(models)
            
            const root = document.createElement('div');
            root.id = 'insomnia-plugin-sync-setting-dialog';
            const app = createApp(SettingDialog)
            app.mount(root)

            document.getElementById('root').appendChild(root)
            console.log(root)
            
            context.app.dialog('webdav setting', root, {
                onHide: () => {console.log('hide')},
            })
        }
    }
]