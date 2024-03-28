<template>
  <div class="w-full h-screen grid place-items-center" v-if="isLoading">
    <Loader />
  </div>
  <div v-else>
    <div v-html="info.user_agreement"></div>
  </div>
</template>

<script >
import { ESTORE_URL } from '@/stores/store'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

export default {
  components: { Loader },
  data() {
    return {
      info: '',
      isLoading: true
    }
  },
  async mounted() {
    try {
      this.isLoading = true
      const response = await axios.get(`${ESTORE_URL}privacy/`)
      const data = response.data
      console.log(data)
      this.info = data
    } catch (error) {
      console.error('ERROR:', error)
    } finally {
      this.isLoading = false
    }
  }
}
</script>
<style></style>
