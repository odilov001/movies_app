<script>
export default {
  name: 'App',
  mounted() {
    this.updateFavicon()
  },
  watch: {
    $route() {
      this.updateFavicon()
    }
  },
  methods: {
    updateFavicon() {
      const companyDataString = localStorage.getItem('companyData')
      if (companyDataString) {
        const companyData = JSON.parse(companyDataString)
        let link = document.querySelector("link[rel*='icon']")
        if (!link) {
          link = document.createElement('link')
          link.type = 'image/x-icon'
          link.rel = 'shortcut icon'
          document.getElementsByTagName('head')[0].appendChild(link)
        }

        if (companyData && companyData.logo_square) {
          link.href = `https://cdn.s3.finpard.io/${companyData.logo_square}`
        }
        document.title = companyData.company_title
      }
    }
  }
}
</script>

<template>
  <RouterView />
</template>
