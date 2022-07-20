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

          await Sync.createFolder(client, folder)
          const hasOldFile = await Sync.checkFileExist(client, folder, fileName)
          console.log(fileName + " has old file", hasOldFile)

          const rawJsonString = await WorkSpace.get_context().data.export.insomnia({
            includePrivate: false,
            format: 'json',
            workspace: WorkSpace.get_models().workspace,
          });

          if (!hasOldFile) {
            console.log("No old file")
            await Sync.newFile(client, folder, fileName, rawJsonString)
            console.log("New file generated")
          } else {
            console.log("start to merge with old file")
            const remoteRaw = await Sync.getRemoteFile(client, folder, fileName)
            let oldJson = JSON.parse(remoteRaw)
            console.log(oldJson)
            let newJson = JSON.parse(rawJsonString)
            console.log(newJson)
          }


        }

        return {
            data, save, sync
        }
    },
}
</script>

