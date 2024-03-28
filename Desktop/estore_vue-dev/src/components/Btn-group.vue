<template lang="html">
  <div class="btn_group">
    <button v-for="(section, index) in sections" :key="index">{{ section.title }}</button>
  </div>
</template>

<script>
import httpServices from '../services/http.js'

export default {
  data() {
    return {
      sections: []
    }
  },
  async mounted() {
    try {
      const response = await fetch(httpServices.baseUrl)
      if (!response.ok) {
        throw new Error(`Page Not Found`)
      }
      const data = await response.json()

      for (let i = 0; i < data.length; i++) {
        if (data[i].products && data[i].products.length > 0) {
          this.sections.push({
            title: data[i].title
          })
        }
      }
    } catch (error) {
      console.log('error')
    }
  }
}
</script>

<style lang="scss">
.btn_group button:hover {
  color: white;
  background-color: #07a461;
}
.btn_group {
  width: 100%;
  text-align: center;

  button {
    min-width: 200px;
    height: auto;
    border-radius: 25px;
    margin-left: 15px;
    padding: 10px 20px;
    border: 1px solid #dbdbe0;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
