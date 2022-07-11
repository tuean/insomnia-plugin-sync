
// https://github.com/perry-mitchell/webdav-client
import { createApp } from 'vue';
import SettingDialog from './SettingDialog.vue'
import {set_context} from "./WorkSpace";

module.exports.workspaceActions = [
    {
        label: 'sync - webdav',
        icon: 'fa-cog',
        action: async (context, models) => {
            console.log(context)
            console.log(models)

            set_context(context)
            const root = document.createElement('div');
            root.id = 'insomnia-plugin-sync-setting-dialog';
            const app = createApp(SettingDialog)
            app.mount(root)

            document.getElementById('root').appendChild(root)
            console.log(root)
            
            context.app.dialog('webdav setting', root, {
                onHide: () => {
                    console.log('hide')
                    app.unmount()
                },
                skinny: true,
                width: true
            })
        }
    }
]