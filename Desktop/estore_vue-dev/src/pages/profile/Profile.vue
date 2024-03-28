<template lang="">
  <div class="profile container mx-auto max-w-[500px]">
    <div
      class="profile_payment flex flex-col gap-2"
      :class="{ profile_payment: true, blurred: isBlurred }"
    >
      <!-- start navbar -->
      <nav class="flex flex-col gap-5">
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

        <div class="user h-10 flex items-center gap-4 justify-between" v-show="showBonusDetails">
          <div class="flex items-center gap-4">
            <div>
              <RouterLink to="/profile/user" class="flex flex-col gap-2">
                <h5 class="flex items-center gap-2">
                  <span class="capitalize"> {{ client.first_name }}</span>
                  <span class="capitalize flex items-center">
                    {{ client.last_name?.[0].toUpperCase() }}
                  </span>
                </h5>
                <!-- <RouterLink-progress type="circle" :percent="11" /> -->

                <h6>{{ client.rank_title }}</h6>
              </RouterLink>
            </div>
          </div>
          <div class="btn_red grid place-items-center" id="showModalButton">
            <button @click="handlerModalInvite">Пригласить друга</button>
          </div>
        </div>
        <div
          class="profile_btn_group flex items-center justify-between"
          v-if="client.rank_title"
          v-show="showBonusDetails"
        >
          <button
            :class="{ installment_btn: true, 'bg-white': isInstallmentBtn }"
            class="ml-1"
            @click="showInstallmentCards"
          >
            Мои покупки
          </button>
          <button
            :class="{ bonus_btn: true, 'bg-white': isBonusBtnClicked }"
            class="mr-1"
            @click="showBonusCards"
          >
            Мои бонусы
          </button>
        </div>
      </nav>
      <!-- finish navbar and header  -->
      <div v-if="isLoading" class="spin w-full h-[60vh] grid place-items-center">
        <Loader />
      </div>
      <!-- finish header  -->
      <div class="profile_cards">
        <!-- INSTALLMENT CARDS  -->

        <div class="w-full installment_cards flex flex-col gap-2" v-show="showInstallment">
          <div
            v-for="(installment, index) in installments"
            :key="index"
            class="card_installment flex items-start justify-between"
            :class="{
              active_installment: installment.status === 100
            }"
          >
            <div>
              <div class="flex items-center gap-2">
                <a-progress
                  type="circle"
                  :stroke-width="6"
                  :stroke-color="{ '100%': '#219653' }"
                  :percent="balancePercentage(installment)"
                  :size="30"
                />

                <span>Договор {{ installment.contract }}</span>
              </div>
              <div class="pl-8">
                <div
                  class="payment mt-2"
                  v-if="installment.status !== 200 && installment.status !== '200'"
                >
                  <p v-if="installment.status === 100 && installment.next_payment < 0">
                    Ближайший платёж
                    {{
                      installment.next_payment === null
                        ? ''
                        : formatDaysToMonths(Math.abs(installment.next_payment))
                    }}
                    :
                  </p>
                  <p
                    v-else-if="installment.status === 100 && installment.next_payment > 0"
                    class="!text-[red]"
                  >
                    Просроченo
                    {{
                      installment.next_payment === null
                        ? ''
                        : formatDaysToMonths(Math.abs(installment.next_payment))
                    }}
                    :
                  </p>
                  <h4 class="mt-2">{{ formatPrice(installment.total_for_pay) }} {{ currency }}</h4>
                </div>
                <p class="remainder mt-2">
                  Остаток: {{ formatPrice(installment.remaining_balance) }} {{ currency }}
                </p>
              </div>
            </div>
            <div class="flex flex-col items-end justify-end">
              <p
                v-if="installment.status === 100 && installment.next_payment < 0"
                class="active grid place-items-center"
              >
                Активный
              </p>
              <p
                v-else-if="installment.status === 100 && installment.next_payment > 0"
                class="grid place-items-center expired"
              >
                Просрочен
              </p>
              <p
                v-else-if="installment.status === 200"
                class="expired grid place-items-center text-[#8C8C8C] bg-[#F1F2F0]"
              >
                Закрыт
              </p>
              <p v-else-if="installment.status === 300" class="expired grid place-items-center">
                Аннулировано
              </p>
              <a
                target="_blank"
                :href="'https://fnp.one/' + installment.link"
                class="mt-[70px] text-[#07a461]"
                >перейти</a
              >
            </div>
          </div>
        </div>
        <div class="w-full bonus_cards flex flex-col gap-2" v-show="showBonus">
          <div class="all_history w-full bg-white py-5 rounded-[15px]" v-show="showAllHistory">
            <p
              class="back flex items-center gap-1 px-5 cursor-pointer hover:text-[#07a461]"
              @click="(showAllHistory = false), (showBonusDetails = true)"
            >
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
                </svg>
              </span>
              <span class="text-[18px]">Назад</span>
            </p>
            <div class="flex flex-col gap-2 w-full h-auto p-5">
              <h3 class="text-[20px] font-[700]">История начислений</h3>

              <div
                v-for="(historyItem, index) in bonusHistory"
                :key="index"
                class="flex items-center justify-between"
              >
                <div class="mt-3">
                  <span class="text-[18px]">{{ historyItem.date }}</span>
                  <p class="mt-2 !text-[13px] font-[400] text-[#8c8c8c]">
                    {{ historyItem.purchaseDetails }} <br />
                    {{ historyItem.line }}
                  </p>
                </div>
                <div class="bonus">
                  <h2 class="text-[#07a461] text-[15px] font-[600]">
                    {{ historyItem.bonus }} {{ currency }}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4" v-show="showBonusDetails">
            <div class="flex flex-col gap-2 accessible w-full h-auto p-5 bg-white">
              <h4>{{ formatPrice(bonus.balance) }} {{ currency }}</h4>
              <p>доступно для списания</p>
            </div>
          </div>
          <div
            class="flex flex-col gap-2 bonus_card w-full h-auto p-5 bg-white"
            v-show="showBonusDetails"
          >
            <h4>до {{ bonus.largest_percent }}</h4>
            <p class="per">
              Стоимости покупки в рассрочку ваших друзей и их друзей возвращаются вам бонусами
            </p>
            <h4 class="mt-5">до {{ bonus.usage_limit }}</h4>
            <p class="per">Стоимости вашей покупки можно оплатить бонусами</p>
          </div>
          <div
            class="flex flex-col gap-2 bonus_card w-full h-auto p-5 bg-white"
            v-show="showBonusDetails"
          >
            <h4>История начислений</h4>
            <!-- Iterate over each history item -->
            <div v-if="showAllHistory">
              <div
                v-for="(historyItem, index) in bonusHistory"
                :key="index"
                class="flex items-center justify-between"
              >
                <div class="mt-3">
                  <span class="text-[18px]">{{ historyItem.date }}</span>
                  <p class="mt-2">
                    {{ historyItem.purchaseDetails }} <br />
                    {{ historyItem.line }}
                  </p>
                </div>
                <div class="bonus">
                  <h2>{{ formatPrice(historyItem.bonus) }}{{ currency }}</h2>
                </div>
              </div>
            </div>
            <div
              v-else
              v-for="(historyItem, index) in limitedHistory"
              :key="index"
              class="flex items-center justify-between"
            >
              <div class="mt-3">
                <span class="!text-[18px]">{{ historyItem.date }}</span>
                <p class="mt-2">
                  {{ historyItem.purchaseDetails }} <br />
                  {{ historyItem.line }}
                </p>
              </div>
              <div class="bonus">
                <h2>{{ formatPrice(historyItem.bonus) }} {{ currency }}</h2>
              </div>
            </div>
            <p class="mt-3 btn_history !text-[#07a461] cursor-pointer" @click="toggleAllHistory">
              Показать всю историю
            </p>
          </div>

          <div
            class="flex flex-col gap-5 bonus_card w-full h-auto p-5 bg-white"
            v-show="showBonusDetails"
          >
            <!-- <h4>Дополнительно</h4>

            <div class="flex items-center justify-between">
              <h5>Правила программы лояльности</h5>
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.22032 5.22007C8.36094 5.07962 8.55157 5.00073 8.75032 5.00073C8.94907 5.00073 9.13969 5.07962 9.28032 5.22007L13.5303 9.47007C13.6708 9.6107 13.7497 9.80132 13.7497 10.0001C13.7497 10.1988 13.6708 10.3894 13.5303 10.5301L9.28032 14.7801C9.13814 14.9126 8.9501 14.9847 8.75579 14.9812C8.56149 14.9778 8.37611 14.8991 8.2387 14.7617C8.10128 14.6243 8.02257 14.4389 8.01914 14.2446C8.01571 14.0503 8.08784 13.8622 8.22032 13.7201L11.9403 10.0001L8.22032 6.28007C8.07987 6.13945 8.00098 5.94882 8.00098 5.75007C8.00098 5.55132 8.07987 5.3607 8.22032 5.22007Z"
                    fill="#AFAFAF"
                  />
                </svg>
              </span>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal_invite profile_collapse container mx-auto max-w-[500px]"
      :style="{ bottom: isBlurred ? '0' : '-100%' }"
    >
      <div class="top flex items-center justify-between p-5">
        <button class="close_modal" @click="handlerModalInvite">Закрыть</button>
        <span class="mr-[90px]"
          ><svg
            width="33"
            height="4"
            viewBox="0 0 33 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect opacity="0.6" width="33" height="4" rx="2" fill="white" />
          </svg>
        </span>
        <RouterLink to="#"></RouterLink>
      </div>

      <div class="modal_title text-center">
        <h1>Приглашайте друзей</h1>
        <p>
          А мы вернем вам бонусами до {{ bonus.largest_percent }} <br />
          от их покупок в рассрочку
        </p>
      </div>

      <div class="share_links flex flex-col gap-3 mt-10">
        <a
          target="_blank"
          :href="'tg://msg?text=https://finpard_client_bot.t.me/?ref=' + client.referral_code"
          class="share flex items-center justify-between gap-5 telegram px-20"
        >
          <p class="text-white">Telegram</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 100 100"
            viewBox="0 0 100 100"
            id="Telegram"
          >
            <path
              fill="#fff"
              d="M88.723,12.142C76.419,17.238,23.661,39.091,9.084,45.047c-9.776,3.815-4.053,7.392-4.053,7.392
							s8.345,2.861,15.499,5.007c7.153,2.146,10.968-0.238,10.968-0.238l33.62-22.652c11.922-8.107,9.061-1.431,6.199,1.431
							c-6.199,6.2-16.452,15.975-25.036,23.844c-3.815,3.338-1.908,6.199-0.238,7.63c6.199,5.246,23.129,15.976,24.082,16.691
							c5.037,3.566,14.945,8.699,16.452-2.146c0,0,5.961-37.435,5.961-37.435c1.908-12.637,3.815-24.321,4.053-27.659
							C97.307,8.804,88.723,12.142,88.723,12.142z"
              class="color1b92d1 svgShape"
            ></path>
          </svg>
        </a>
        <a
          target="_blank"
          :href="'https://wa.me/?text=https://finpard_client_bot.t.me/?ref=' + client.referral_code"
          class="share flex items-center justify-between gap-5 watsapp px-20"
        >
          <p class="text-white">Watsapp</p>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 737.509 740.824" id="Whatsapp">
            <path
              fill-rule="evenodd"
              d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714"
              clip-rule="evenodd"
              fill="#ffffff"
              class="color000000 svgShape"
            ></path>
          </svg>
        </a>
        <a
          target="_blank"
          :href="'sms://+10000?body=https://finpard_client_bot.t.me/?ref=' + client.referral_code"
          class="share flex items-center justify-between gap-5 sms px-20"
        >
          <p class="text-white">SMS</p>

          <svg
            class="hover:bg-none text-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="Chat"
          >
            <path
              d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"
              fill="#ffffff"
              class="color000000 svgShape"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- start footer  -->

  <Footer />
</template>
<script>
import logo from '@/assets/images/Frame 1171276127.svg'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader.vue'
import { ESTORE_URL } from '../../stores/store.js'
import httpServices from '../../services/http.js'

export default {
  data() {
    return {
      client: {},
      installments: [],
      bonus: {},
      logo: '',
      showInstallment: true,
      showBonus: false,
      isBonusBtnClicked: false,
      isInstallmentBtn: true,
      isBlurred: false,
      isLoading: false,
      showAllHistory: false,
      showBonusDetails: true,
      bonusHistory: [],
      next_payment: {},
      phoneNumber: '',
      currency: ''
    }
  },
  components: {
    Footer,
    Loader
  },
  async mounted() {
    this.isLoading = true
    try {
      const response = await fetch(`${ESTORE_URL}installments/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${httpServices.session.get()}`
        }
      })

      const data = await response.json()
      this.currency = data.currency
      console.log(data.currency)
      console.log(data)
      if (data.client) {
        this.client = data.client
      }
      if (data.installments) {
        this.installments = data.installments.flat()
        this.installments.forEach((installment) => {
          this.next_payment = installment.next_payment
        })
        // console.log(this.installments)
      }
      if (data.bonus) {
        this.bonus = data.bonus
        if (Array.isArray(data.bonus.items) && data.bonus.items.length > 0) {
          this.bonusHistory = data.bonus.items.map((item) => ({
            date: item.transaction_date,
            purchaseDetails: item.client_name,
            line: `${item.level} линия`,
            bonus: `+${item.total}`
          }))
        }
      }

      // console.log(this.bonusHistory)
      // this.installments.forEach((installment) => {
      //   console.log(installment)
      // })
      // console.log(this.bonus.usage_limit)

      // console.log(data)

      this.isLoading = false
    } catch (error) {
      console.error(error)
      // message.error('Что-то пошло не так, попробуйте еще раз')
      this.isLoading = true
    }
    console.log(this.client.referral_code)

    localStorage.setItem('name', this.client.first_name)
  },
  methods: {
    formatPrice(price) {
      if (price === null || price === undefined || isNaN(price)) {
        return '0'
      }

      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    formatDaysToMonths(days) {
      const months = Math.floor(days / 30)
      const remainingDays = days % 30

      function getDaysText(days) {
        if (days % 10 === 1 && days !== 11) {
          return `${days} день`
        } else if (days % 10 >= 2 && days % 10 <= 4 && (days < 10 || days > 20)) {
          return `${days} дня`
        } else {
          return `${days} дней`
        }
      }

      if (months < 1) {
        return getDaysText(days)
      } else if (months === 1) {
        if (remainingDays === 0) {
          return `1 месяц`
        } else {
          return `1 месяц и ${getDaysText(remainingDays)}`
        }
      } else {
        if (remainingDays === 0) {
          return `${months} месяцев`
        } else {
          return `${months} месяцев и ${getDaysText(remainingDays)}`
        }
      }
    },
    showInstallmentCards() {
      this.showInstallment = true
      this.showBonus = false
      this.isBonusBtnClicked = false
      this.isInstallmentBtn = true
    },
    showBonusCards() {
      this.showInstallment = false
      this.showBonus = true
      this.isBonusBtnClicked = true
      this.isInstallmentBtn = false
    },
    handlerModalInvite() {
      this.isBlurred = !this.isBlurred
    },
    balancePercentage(installment) {
      if (installment.total_for_pay === 0) {
        return 0
      }
      const percentage =
        ((installment.total_for_pay - installment.remaining_balance) / installment.total_for_pay) *
        100

      return parseFloat(percentage.toFixed(0))
    },
    toggleAllHistory() {
      this.showAllHistory = !this.showAllHistory
      this.showBonusDetails = !this.showBonusDetails
    },
    updateName() {
      this.$store.dispatch('setFirstName', this.client.first_name)
    },
    logOutBtnClick() {
      localStorage.removeItem('token')
      localStorage.clear()
      window.location.reload()
    }
  },
  computed: {
    usageLimitPercent() {
      return parseFloat(this.bonus.usage_limit)
    },
    limitedHistory() {
      return this.showAllHistory ? this.bonusHistory : this.bonusHistory.slice(0, 6)
    },
    formattedCurrency() {
      const formattedNumber = new Intl.NumberFormat('ru-RU').format(this.next_payment.amount)

      return `${formattedNumber} СУМ`
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
<style lang="scss">
.ant-progress-text {
  font-size: 10px !important;
}
.share_links:hover path {
  stroke: none !important;
}
.profile {
  max-width: 600px;

  .user {
    h5 {
      font-size: 20px;
      font-weight: 600;
      line-height: 22px;
    }
    h6 {
      font-size: 16px;
      font-weight: 600;
      line-height: 15px;
      color: #8c8c8c;
    }
  }
  .btn_red {
    background-color: #ff4611;
    width: 150px;
    height: 34px;

    border-radius: 15px;
    color: white;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
  }

  nav {
    padding: 20px;
    background-color: #fff;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
}

.card_installment {
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 25px;
  background-color: #fff;
  span,
  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
  }
}
.payment {
  p {
    color: #ff4611;
  }
  h4 {
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
  }
}

.expired {
  width: 100px;
  height: 24px;
  padding: 3px, 8px, 3px, 8px;
  color: #ff4611;
  border-radius: 15px;
  background: #ff46111f;
}

.active_installment {
  .payment p {
    color: #219653;
  }
  .active {
    width: 100px;
    height: 24px;
    padding: 3px, 8px, 3px, 8px;
    border-radius: 15px;
    color: #07a461;
    background: #07a4611f;
  }
}
.bonus_cards {
  margin-bottom: 80px;
}

.profile_btn_group {
  width: 100%;
  height: 52px;
  border-radius: 15px;

  background-color: #f0f0f5;

  button {
    width: 167.5px;
    height: 44px;
    padding: 12px, 24px, 12px, 24px;
    border-radius: 16px;

    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
}
.close_agreement .close {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  width: 58px;
  height: 24px;
  padding: 3px, 8px, 3px, 8px;
  border-radius: 15px;
  background: #f1f2f0;
}

.installment_cards {
  margin-bottom: 100px !important;
}
//BONUS CARD

.card_bonus {
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 25px;
}
.per {
  width: auto !important;
}
.bonus_card p {
  width: 200px;
}

.accessible,
.bonus_card {
  border-radius: 25px;
  h4 {
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
  }
  p {
    font-size: 13px;
    font-weight: 400;
    line-height: 15px;

    color: #8c8c8c;
  }

  .bonus h2 {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    color: #07a461;
  }

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #219653;
  }
  span {
    font-size: 18px;
  }
}

.credentials,
.show_history {
  width: 100%;
  height: 100vh;
  background-color: white;
  margin-bottom: 0;
  h1 {
    font-size: 22px;
    font-weight: 700;
    line-height: 27px;
  }
  p {
    max-width: 200px;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    color: #8c8c8c;
  }
  h6 {
    //stylename: B2;

    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
  }

  h2 {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    color: #07a461;
  }
}

.back {
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
}

.active_btn {
  background-color: white;
}

.show_history {
  h3 {
    font-size: 22px;
    font-weight: 700;
    line-height: 27px;
  }
  span {
    font-size: 18px;
  }
}

.modal_invite {
  max-width: 600px;
  background: #f0f0f5;
  position: fixed;
  bottom: -100%;
  transition: bottom 1s ease;
  z-index: 200;
  border-radius: 25px 25px 0 0;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;

    color: #219653;
  }
  .modal_title {
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
    }
  }

  h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
  }

  .close_modal {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;

    color: #219653;
  }
  span {
    position: relative;
    bottom: 40px;
  }
}

.invited {
  width: 100%;
  height: auto;
  background-color: #fff;
  border-radius: 25px 25px 0 0;
  h2 {
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
  }
}

.activated_users {
  h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
  }

  .line {
    width: 96px;
    height: 24px;
    display: grid;
    place-items: center;
    background-color: #f1f2f0;
    border-radius: 15px;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
  }
}
.profile_payment.blurred {
  height: 100vh;
  background-color: #f2f2f7;
  filter: brightness(40%);
}
.modal_invite.active {
  bottom: 0;
}
.modal_copy.active {
  bottom: 0;
}
.modal_copy {
  max-width: 600px;
  position: fixed;
  bottom: -100%;

  transition: bottom 1s linear;
  z-index: 200;

  border-radius: 25px 25px 0 0;

  input {
    padding: 10px 0;
    width: 100%;
    height: 48px;
    outline: none;
    background: none;
    border-radius: 15px;
  }
  input:focus {
    border: none;
  }
}

h1 {
  font-size: 22px;
  font-weight: 700;
  line-height: 27px;
  color: #222222;
}

.share_links {
  padding: 0 10px;
  padding-bottom: 20px;
  .share {
    width: 100%;
    height: 54px;
    font-size: 17px;
    font-weight: 600;
    line-height: 24px;
    padding: 15px, 20px;
    border-radius: 15px;
    cursor: pointer;
  }
  a:hover {
    color: #fff;
  }
  .telegram {
    background-color: #0088cc;
  }
  .watsapp {
    background-color: #25d366;
  }
  .sms {
    background-color: #1ba5e6;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  a {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
}

.credentials {
  span,
  h6 {
    font-size: 18px;
  }
  p {
    font-size: 16px;
  }
}
</style>
