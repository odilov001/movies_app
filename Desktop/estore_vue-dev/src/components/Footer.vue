<template lang="html">
  <Collapse :class="{ active: isDropdownActive }" v-if="isDropdownActive" class="dropdown" />
  <div class="footer md:hidden flex fixed items-center justify-between">
    <RouterLink @click="handleClick2" to="/" class="home flex flex-col items-center gap-1">
      <span
        ><svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.75 12.0001L11.704 3.04507C12.144 2.60607 12.856 2.60607 13.295 3.04507L22.25 12.0001M5 9.75007V19.8751C5 20.4961 5.504 21.0001 6.125 21.0001H10.25V16.1251C10.25 15.5041 10.754 15.0001 11.375 15.0001H13.625C14.246 15.0001 14.75 15.5041 14.75 16.1251V21.0001H18.875C19.496 21.0001 20 20.4961 20 19.8751V9.75007M8.75 21.0001H17"
            stroke="#8C8C8C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Главная</p>
    </RouterLink>
    <button
      @click="handleClick"
      @click.native="scrollToTop"
      class="catalog hamburger flex flex-col items-center gap-1"
    >
      <span
        ><svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.6667 21L19.2022 17.5355M19.2022 17.5355C20.1399 16.5978 20.6667 15.326 20.6667 14C20.6667 12.6739 20.1399 11.4021 19.2022 10.4645C18.2645 9.52678 16.9928 9 15.6667 9C14.3406 9 13.0689 9.52678 12.1312 10.4645C11.1935 11.4021 10.6667 12.6739 10.6667 14C10.6667 15.326 11.1935 16.5978 12.1312 17.5355C13.0689 18.4732 14.3406 18.9999 15.6667 18.9999C16.9928 18.9999 18.2645 18.4732 19.2022 17.5355Z"
            stroke="#AFAFAF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.66675 5H20.6667M3.66675 11H7.16675M3.66675 17H7.66675"
            stroke="#AFAFAF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Каталог</p>
    </button>
    <RouterLink to="/cart" class="basket flex flex-col items-center gap-1">
      <span
        ><svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.58325 3H3.96925C4.47925 3 4.92425 3.343 5.05625 3.835L5.43925 5.272M5.43925 5.272C11.0099 5.11589 16.5752 5.73515 21.9753 7.112C21.1513 9.566 20.1723 11.95 19.0513 14.25H7.83325M5.43925 5.272L7.83325 14.25M7.83325 14.25C7.0376 14.25 6.27454 14.5661 5.71193 15.1287C5.14932 15.6913 4.83325 16.4544 4.83325 17.25H20.5833M6.33325 20.25C6.33325 20.4489 6.25423 20.6397 6.11358 20.7803C5.97293 20.921 5.78216 21 5.58325 21C5.38434 21 5.19357 20.921 5.05292 20.7803C4.91227 20.6397 4.83325 20.4489 4.83325 20.25C4.83325 20.0511 4.91227 19.8603 5.05292 19.7197C5.19357 19.579 5.38434 19.5 5.58325 19.5C5.78216 19.5 5.97293 19.579 6.11358 19.7197C6.25423 19.8603 6.33325 20.0511 6.33325 20.25ZM19.0833 20.25C19.0833 20.4489 19.0042 20.6397 18.8636 20.7803C18.7229 20.921 18.5322 21 18.3333 21C18.1343 21 17.9436 20.921 17.8029 20.7803C17.6623 20.6397 17.5833 20.4489 17.5833 20.25C17.5833 20.0511 17.6623 19.8603 17.8029 19.7197C17.9436 19.579 18.1343 19.5 18.3333 19.5C18.5322 19.5 18.7229 19.579 18.8636 19.7197C19.0042 19.8603 19.0833 20.0511 19.0833 20.25Z"
            stroke="#AFAFAF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Корзина</p>
    </RouterLink>
    <RouterLink :to="cabinetRoute" class="cabinet flex flex-col items-center gap-1">
      <span
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.982 18.7249C17.2833 17.7998 16.3793 17.0496 15.3412 16.5333C14.3031 16.0171 13.1594 15.7489 12 15.7499C10.8407 15.7489 9.6969 16.0171 8.65883 16.5333C7.62077 17.0496 6.71675 17.7998 6.01801 18.7249M17.982 18.7249C19.3455 17.5121 20.3071 15.9135 20.7412 14.141C21.1753 12.3686 21.0603 10.506 20.4115 8.80043C19.7627 7.09482 18.6107 5.62673 17.1084 4.59085C15.6061 3.55497 13.8244 3.00024 11.9995 3.00024C10.1747 3.00024 8.39295 3.55497 6.89062 4.59085C5.38829 5.62673 4.23634 7.09482 3.58755 8.80043C2.93875 10.506 2.82376 12.3686 3.25783 14.141C3.6919 15.9135 4.65451 17.5121 6.01801 18.7249M17.982 18.7249C16.336 20.1931 14.2056 21.0031 12 20.9999C9.79404 21.0033 7.66425 20.1934 6.01801 18.7249M15 9.74995C15 10.5456 14.6839 11.3087 14.1213 11.8713C13.5587 12.4339 12.7957 12.7499 12 12.7499C11.2044 12.7499 10.4413 12.4339 9.87869 11.8713C9.31608 11.3087 9.00001 10.5456 9.00001 9.74995C9.00001 8.9543 9.31608 8.19124 9.87869 7.62863C10.4413 7.06602 11.2044 6.74995 12 6.74995C12.7957 6.74995 13.5587 7.06602 14.1213 7.62863C14.6839 8.19124 15 8.9543 15 9.74995Z"
            stroke="#AFAFAF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Профиль</p>
    </RouterLink>
  </div>
</template>
<script>
import Collapse from './Collapse.vue'
import httpServices from '@/services/http'
export default {
  data() {
    return {
      isDropdownActive: false,
      isAuthenticated: httpServices.session.get()
    }
  },
  components: {
    Collapse
  },
  methods: {
    handleClick() {
      this.isDropdownActive = !this.isDropdownActive
    },
    handleClick2() {
      this.isDropdownActive = false
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  computed: {
    cabinetRoute() {
      return this.isAuthenticated ? '/profile' : '/login'
    }
  }
}
</script>
<style lang="scss">
.footer {
  width: 100%;
  height: 70px;
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index: 100;
  left: 0;
  padding: 0 1rem;

  a:hover p {
    color: #07a461;
  }
  p {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #8c8c8c;
  }
}
</style>
