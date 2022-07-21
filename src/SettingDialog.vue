<template>
    <div class="width:100%;padding-left:12px">
      <div style="margin: 6px;height: 36px;padding-left:12px">
        <input style="height: 36px;line-height: 36px;width:100%;" placeholder="url" v-model="data.url"/>
      </div>
      <div style="margin: 6px;height: 36px;padding-left:12px">
        <input style="height: 36px;line-height: 36px;width:100%;" placeholder="user" v-model="data.user"/>
      </div>
      <div style="margin: 6px;height: 36px;padding-left:12px">
        <input style="height: 36px;line-height: 36px;width:100%;" placeholder="token" type="password" v-model="data.token" />
      </div>
    </div>

    <div style="height: 36px; display: flex;padding: 6px 6px 6px 12px;">
      <div @click="save"
           style="font-size: 20px;cursor: pointer;">
        save
      </div>
      <div @click="sync(false)"
           style="margin-left: 12px;font-size: 20px;cursor: pointer;">
        sync
      </div>
      <div @click="sync(true)"
           style="margin-left: 12px;font-size: 20px;cursor: pointer;">
        syncInCollection
      </div>
    </div>
</template>
    
<script>
import {markRaw, reactive} from 'vue'
import { AuthType, createClient } from "webdav";
import * as WorkSpace from './WorkSpace'
import * as Sync from './sync'
import * as Util from './util'

export default {
    setup() {
        const folder = '/insomnia'
        const fileName = 'insomnia-bg.json'
        const data = reactive({
            url: '',
            user: '',
            token: ''
        })

        const init = async () => {
          data.url = await WorkSpace.get_webdav_url()
          data.user = await WorkSpace.get_webdav_user()
          data.token = await WorkSpace.get_webdav_pwd()
        }

        init()

        const save = async () => {
          console.log(data)
          await WorkSpace.set_webdav_url(data.url)
          await WorkSpace.set_webdav_user(data.user)
          await WorkSpace.set_webdav_pwd(data.token)
          console.log(WorkSpace.get_context())
        }

        const sync = async (sync2This) => {
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
            let remoteJson = JSON.parse(remoteRaw)
            let localJson = JSON.parse(rawJsonString)
            let result = Util.merge(remoteJson, localJson, sync2This)
            console.log("after merge", result)
            await WorkSpace.get_context().data.import.raw(JSON.stringify(result));
          }

        }

        return {
            data, save, sync, init
        }
    },
}
</script>

