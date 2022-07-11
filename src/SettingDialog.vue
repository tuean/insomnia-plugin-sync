<template>
    <div class="width:100%">
      <div style="margin: 6px;height: 36px;">
        <input style="height: 36px;line-height: 36px;" placeholder="url" v-model="data.url"/>
      </div>
      <div style="margin: 6px;height: 36px;">
        <input style="height: 36px;line-height: 36px;" placeholder="user" v-model="data.user"/>
      </div>
      <div style="margin: 6px;height: 36px;">
        <input style="height: 36px;line-height: 36px;" placeholder="token" v-model="data.token" />
      </div>
    </div>

    <div style="padding: 6px;height: 36px;">
      <div @click="save">save</div>
    </div>
</template>
    
<script>
import { reactive } from 'vue'
import { AuthType, createClient } from "webdav";
import * as WorkSpace from './WorkSpace'

export default {
    setup() {
        const data = reactive({
            url: '',
            user: '',
            token: ''
        })

        const save = () => {
          console.log(data)
          WorkSpace.set_webdav_user()

        }

        const sync = () => {

          const client = createClient(data.url, {
            authType: AuthType.Token,
            username: data.user,
            token: data.pwd
          });
        }

        return {
            data, save
        }
    },
}
</script>

