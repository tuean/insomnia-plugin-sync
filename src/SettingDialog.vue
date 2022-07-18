<template>
    <div class="width:100%;padding-left:12px">
      <div style="margin: 6px;height: 36px;">
        <input style="height: 36px;line-height: 36px;" placeholder="url" v-model="data.url"/>
      </div>
      <div style="margin: 6px;height: 36px;">
        <input style="height: 36px;line-height: 36px;" placeholder="user" v-model="data.user"/>
      </div>
      <div style="margin: 6px;height: 36px;">
        <input style="height: 36px;line-height: 36px;" placeholder="token" type="password" v-model="data.token" />
      </div>
    </div>

    <div style="padding: 6px;height: 36px;">
      <div @click="save">save</div>
      <div @click="sync">sync</div>
    </div>
</template>
    
<script>
import { reactive } from 'vue'
import { AuthType, createClient } from "webdav";
import * as WorkSpace from './WorkSpace'
import * as Sync from './sync'

export default {
    setup() {
        const folder = '/insomnia'
        const fileName = 'insomnia-bg.json'
        const data = reactive({
            url: 'https://dav.jianguoyun.com/dav/',
            user: 'tuean_z@163.com',
            token: 'akan6xsf9p6f4bxr'
        })

        const save = async () => {
          console.log(data)
          await WorkSpace.set_webdav_user(data.url)
          await WorkSpace.set_webdav_user(data.user)
          await WorkSpace.set_webdav_pwd(data.token)
        }

        const sync = async () => {
          const client = createClient(data.url, {
            authType: AuthType.Password,
            username: data.user,
            password: data.token
          });
          Sync.createFolder(client, folder)
          const hasOldFile = Sync.checkFileExist(client, folder, fileName)
          if (hasOldFile) {

          }
          const rawJsonString = await WorkSpace.get_context().data.export.insomnia({
            includePrivate: false,
            format: 'json',
            workspace: models.workspace,
          });

        }

        return {
            data, save, sync
        }
    },
}
</script>

