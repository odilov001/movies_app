<template lang="">
  <div class="profile container mx-auto flex flex-col gap-2 bg-white credentials max-w-[500px]">
    <div class="flex flex-col gap-5 p-5">
      <div class="flex items-center justify-between">
        <div class="">
          <RouterLink to="/" class="">
            <img :src="'https://cdn.s3.finpard.io/' + logo" class="h-8 logo" alt="logo" />
          </RouterLink>
        </div>

        <div class="connect flex items-center gap-5">
          <a :href="'tel:' + phoneNumber" class="flex items-center gap-2">
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
          <button
            @click="logOutBtnClick"
            class="text-[16px] bg-[#219653] text-white p-2 rounded-md logout"
          >
            Выход
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="spin w-full h-[60vh] grid place-items-center">
        <Loader />
      </div>
      <div v-else class="flex flex-col gap-5">
        <RouterLink to="/profile" class="back flex items-center gap-1">
          <span
            ><svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.78032 4.22007C9.92077 4.3607 9.99966 4.55132 9.99966 4.75007C9.99966 4.94882 9.92077 5.13945 9.78032 5.28007L7.06032 8.00007L9.78032 10.7201C9.854 10.7887 9.91311 10.8715 9.9541 10.9635C9.99509 11.0555 10.0171 11.1548 10.0189 11.2556C10.0207 11.3563 10.0022 11.4563 9.96444 11.5497C9.92672 11.6431 9.87057 11.7279 9.79935 11.7991C9.72814 11.8703 9.6433 11.9265 9.54991 11.9642C9.45653 12.0019 9.3565 12.0204 9.25579 12.0187C9.15509 12.0169 9.05578 11.9948 8.96378 11.9539C8.87178 11.9129 8.78898 11.8538 8.72032 11.7801L5.47032 8.53007C5.32987 8.38945 5.25098 8.19882 5.25098 8.00007C5.25098 7.80132 5.32987 7.6107 5.47032 7.47007L8.72032 4.22007C8.86094 4.07962 9.05157 4.00073 9.25032 4.00073C9.44907 4.00073 9.63969 4.07962 9.78032 4.22007Z"
                fill="#AFAFAF"
              />
            </svg> </span
          ><span>Назад</span>
        </RouterLink>

        <h1>Учётные данные</h1>
        <div>
          <p>Ваш ранг</p>
          <h6 class="flex items-center gap-1 mt-2">
            {{ rank !== null ? rank.title + ' : ' + rank.discount + ' %' : '' }}
          </h6>
        </div>
        <div>
          <p>Телефон</p>
          <h6 class="flex items-center gap-1 mt-2">{{ user_data.phone }}</h6>
        </div>
        <div>
          <p>Почта</p>
          <h6 class="flex items-center gap-1 mt-2">{{ user_data.email }}</h6>
        </div>
        <div>
          <p>ФИО</p>
          <h6 class="flex items-center gap-1 mt-2 capitalize">
            {{ user_data.first_name }} {{ user_data.last_name }} {{ user_data.father_name }}
          </h6>
        </div>
        <div>
          <p>Дата рождения</p>
          <h6 class="flex items-center gap-1 mt-2">{{ user_data.birth_date }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'
import { message } from 'ant-design-vue'
import httpServices from '../../services/http.js'
import { ESTORE_URL } from '../../stores/store.js'
export default {
  data() {
    return {
      logo: '',
      isLoading: false,
      user_data: [],
      rank: [],
      phoneNumber: ''
    }
  },

  async mounted() {
    try {
      this.isLoading = true
      const response = await fetch(`${ESTORE_URL}profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${httpServices.session.get()}`
        }
      })
      const data = await response.json()
      this.user_data = data
      this.rank = data.rank

      this.isLoading = false
    } catch (error) {
      message.error('Что-то пошло не так, попробуйте еще раз')
      console.error(error)
      this.isLoading = true
    }
  },
  components: {
    Loader
  },
  methods: {
    logOutBtnClick() {
      localStorage.removeItem('token')
      window.location.reload()
    }
  },
  created() {
    const companyDataString = localStorage.getItem('companyData')

    if (companyDataString !== null) {
      const companyData = JSON.parse(companyDataString)
      this.phoneNumber = companyData.company_phone
      this.logo = companyData.logo_rectangle
    } else {
      console.log('No company data found in localStorage')
    }
  }
}
</script>
<style lang=""></style>
