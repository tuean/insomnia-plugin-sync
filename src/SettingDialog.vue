<template>
    <div>
        <input placeholder="data.url" />
    </div>
</template>
    
<script>
import { reactive } from 'vue'
export default {
    setup() {
        const data = reactive({
            url: '',
            user: '',
            pwd: ''
        })

        return {
            data
        }
    },
}
</script>