<template>
  <nav class="bg-white w-full py-4">
    <div class="navbar container flex items-center justify-between mx-auto px-3">
      <!-- Logo and Catalog Button -->
      <div
        class="category flex justify-center md:flex md:flex-row flex-col gap-5 md:items-center md:gap-5"
      >
        <RouterLink to="/" class="md:flex items-center block">
          <img :src="'https://cdn.s3.finpard.io/' + logo" class="h-8 logo" alt="logo" />
        </RouterLink>
        <button
          class="hamburger btn1 hidden items-center justify-center text-white gap-2 md:flex collapse_open"
          @click="handleHamburgerClick"
        >
          <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          Каталог
        </button>
        <div class="input h-10 flex items-center gap-4">
          <input type="text" placeholder="Поиск по каталогу" class="flex-grow max-w-full" />
        </div>
      </div>
      <!-- Phone number -->
      <a
        :href="'tel:' + phoneNumber"
        class="md:block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 link hidden"
      >
        {{ phoneNumber }}
      </a>
      <!-- Language -->
      <div class="connect md:hidden flex items-center gap-5">
        <a :href="'tel:' + phoneNumber">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.5 4.5C1.5 3.70435 1.81607 2.94129 2.37868 2.37868C2.94129 1.81607 3.70435 1.5 4.5 1.5H5.872C6.732 1.5 7.482 2.086 7.691 2.92L8.796 7.343C8.88554 7.701 8.86746 8.07746 8.74401 8.42522C8.62055 8.77299 8.39723 9.07659 8.102 9.298L6.809 10.268C6.674 10.369 6.645 10.517 6.683 10.62C7.24738 12.1549 8.1386 13.5487 9.29495 14.7051C10.4513 15.8614 11.8451 16.7526 13.38 17.317C13.483 17.355 13.63 17.326 13.732 17.191L14.702 15.898C14.9234 15.6028 15.227 15.3794 15.5748 15.256C15.9225 15.1325 16.299 15.1145 16.657 15.204L21.08 16.309C21.914 16.518 22.5 17.268 22.5 18.129V19.5C22.5 20.2956 22.1839 21.0587 21.6213 21.6213C21.0587 22.1839 20.2956 22.5 19.5 22.5H17.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              fill="#AFAFAF"
            />
          </svg>
        </a>
      </div>
      <!-- Login -->
      <RouterLink
        :to="cabinetRoute"
        class="link hidden md:flex py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 items-center gap-2"
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.982 18.7249C17.2833 17.7998 16.3793 17.0496 15.3412 16.5333C14.3031 16.0171 13.1594 15.7489 12 15.7499C10.8407 15.7489 9.6969 16.0171 8.65883 16.5333C7.62077 17.0496 6.71675 17.7998 6.01801 18.7249M17.982 18.7249C19.3455 17.5121 20.3071 15.9135 20.7412 14.141C21.1753 12.3686 21.0603 10.506 20.4115 8.80043C19.7627 7.09482 18.6107 5.62673 17.1084 4.59085C15.6061 3.55497 13.8244 3.00024 11.9995 3.00024C10.1747 3.00024 8.39295 3.55497 6.89062 4.59085C5.38829 5.62673 4.23634 7.09482 3.58755 8.80043C2.93875 10.506 2.82376 12.3686 3.25783 14.141C3.6919 15.9135 4.65451 17.5121 6.01801 18.7249M17.982 18.7249C16.336 20.1931 14.2056 21.0031 12 20.9999C9.79404 21.0033 7.66425 20.1934 6.01801 18.7249M15 9.74995C15 10.5456 14.6839 11.3087 14.1213 11.8713C13.5587 12.4339 12.7957 12.7499 12 12.7499C11.2044 12.7499 10.4413 12.4339 9.87869 11.8713C9.31608 11.3087 9.00001 10.5456 9.00001 9.74995C9.00001 8.9543 9.31608 8.19124 9.87869 7.62863C10.4413 7.06602 11.2044 6.74995 12 6.74995C12.7957 6.74995 13.5587 7.06602 14.1213 7.62863C14.6839 8.19124 15 8.9543 15 9.74995Z"
              stroke="#222222"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p>{{ isAuthenticated ? firstName : 'Войти' }}</p></RouterLink
      >
      <!-- Basket -->
      <RouterLink
        to="/cart"
        class="link hidden py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 md:flex items-center gap-2"
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 3H3.636C4.146 3 4.591 3.343 4.723 3.835L5.106 5.272M5.106 5.272C10.6766 5.11589 16.2419 5.73515 21.642 7.112C20.818 9.566 19.839 11.95 18.718 14.25H7.5M5.106 5.272L7.5 14.25M7.5 14.25C6.70435 14.25 5.94129 14.5661 5.37868 15.1287C4.81607 15.6913 4.5 16.4544 4.5 17.25H20.25M6 20.25C6 20.4489 5.92098 20.6397 5.78033 20.7803C5.63968 20.921 5.44891 21 5.25 21C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25C4.5 20.0511 4.57902 19.8603 4.71967 19.7197C4.86032 19.579 5.05109 19.5 5.25 19.5C5.44891 19.5 5.63968 19.579 5.78033 19.7197C5.92098 19.8603 6 20.0511 6 20.25ZM18.75 20.25C18.75 20.4489 18.671 20.6397 18.5303 20.7803C18.3897 20.921 18.1989 21 18 21C17.8011 21 17.6103 20.921 17.4697 20.7803C17.329 20.6397 17.25 20.4489 17.25 20.25C17.25 20.0511 17.329 19.8603 17.4697 19.7197C17.6103 19.579 17.8011 19.5 18 19.5C18.1989 19.5 18.3897 19.579 18.5303 19.7197C18.671 19.8603 18.75 20.0511 18.75 20.25Z"
              stroke="#222222"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p>Корзина</p>
      </RouterLink>
    </div>

    <Collapse :class="{ active: isDropdownActive }" v-if="isDropdownActive" class="dropdown" />
  </nav>
</template>

<script>
import Collapse from './Collapse.vue'
import httpServices from '@/services/http'
import { formatPhone } from 'my-format-package'

export default {
  data() {
    return {
      isDropdownActive: false,
      isDropdownActive: false,
      isAuthenticated: httpServices.session.get(),
      user_data: [],
      logo: '',
      firstName: ''
    }
  },
  components: {
    Collapse
  },
  created() {
    const companyDataString = localStorage.getItem('companyData')
    if (companyDataString !== null) {
      const companyData = JSON.parse(companyDataString)

      this.logo = companyData.logo_rectangle
      this.phoneNumber = formatPhone(companyData.company_phone)
    } else {
      console.log('No company data found in localStorage')
    }
  },

  methods: {
    handleHamburgerClick() {
      this.isDropdownActive = !this.isDropdownActive
    },
    phoneNumber() {
      return `+${this.$store.state.phoneNumber}`
    }
  },
  computed: {
    cabinetRoute() {
      return this.isAuthenticated ? '/profile' : '/login'
    }

    // firstName() {
    //   return this.$store.state.firstName
    // }
  },
  mounted() {
    this.firstName = localStorage.getItem('name')
  }
}
</script>

<style lang="scss">
.btn1 {
  background-color: #07a461;
  width: 122px;
  height: 40px;
  border-radius: 15px;
  color: white;
  position: relative;
}
.btn1:hover {
  color: white;
}

.btn_group {
  slider.slider-item-reveal {
    --swiffy-slider-item-reveal: 0 !important;
  }
}

.input {
  border-radius: 15px;
  padding: 12px 15px;
  background-color: #f0f0f5;
  input {
    width: 553px;
    background: none;
    outline: none;
  }
  input:focus {
    border: none;
  }
  input:hover {
    border: none;
  }
}

.btn {
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  border-radius: 8px;
  border: 1px solid #dbdbe0;
  width: 42px;
  height: 30px;
  padding: 4px 12px;
}

.link {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}
.btn:hover {
  color: white;
  background-color: #07a461;
}

.navbar button {
  width: 100px;
  font-size: 14px;
  border-radius: 12px;
}

.btn1,
.input {
  height: 40px;
}
.btn1 img {
  width: 10px;
  height: 10px;
}
.btn1 {
  border-radius: 15px;
  width: 122px;
}
.connect a:hover path {
  fill: #07a461;
}

@media (max-width: 1280px) {
  .input img {
    width: 10px;
    height: 10px;
  }
  .input input {
    width: 100% !important;
  }
  .input input::placeholder {
    font-size: 14px;
  }
}
@media (max-width: 1023px) {
  .input input {
    width: 120px;
  }

  .link p {
    display: none;
  }
  .navbar button {
    width: 80px;
    height: 36px;
    font-size: 12px;
    border-radius: 12px;
  }
  .bar {
    display: block;
    width: 12px;
    height: 1px;
  }
}
@media (max-width: 780px) {
  .navbar {
    display: flex !important;
    align-items: flex-start !important;
  }
  .btn_group {
    overflow-x: scroll;
    display: flex;
    align-items: center;
  }
  .input {
    padding: 20px 20px;
  }
  .input input {
    width: 100%;
  }
  .navbar {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  .category {
    margin-right: -100px;
    width: 100%;
  }
}

.all_product {
  padding-bottom: 20px;
  .price {
    font-size: 16px;
  }
  .text {
    font-size: 400;
    font-size: 12px;
    line-height: 14px;
  }
}

.title_product {
  a {
    font-weight: 400;
    font-size: 12px;
    line-height: 14.5px;
  }
  h1 {
    font-weight: 700;
    font-size: 22px;
    line-height: 26px;
  }
  .count {
    width: 90px;
    height: 32px;
    border-radius: 15px;
    background-color: #f1f2f0;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }
}

@media (max-width: 1280px) {
  .title_product {
    padding-left: 10px;
  }
}
@media (width: 1280px) {
  .all_product,
  .footer_info {
    padding: 0 20px;
  }
}
@media (max-width: 1023px) {
  .all_product {
    .rings {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 0 10px;
      gap: 10px;
    }
  }
}
@media (max-width: 767px) {
  .all_product {
    .rings {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
  }
}
@media (max-width: 600px) {
  .all_product {
    .rings {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
}
@media (max-width: 350px) {
  .all_product {
    .rings {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
}
</style>
../stores/store.js
