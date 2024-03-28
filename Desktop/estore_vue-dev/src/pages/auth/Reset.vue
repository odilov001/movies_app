<template>
  <section class="flex flex-col md:flex-row h-screen items-center register_code">
    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100 flex flex-col gap-5">
        <div>
          <h1 class="text-xl md:text-2xl font-bold leading-tight mb-[30px] text-center">
            Сброс пароли
          </h1>

          <form @submit.prevent action="#">
            <div class="flex flex-col gap-2">
              <input
                v-model="phoneNumber"
                @input="autoStartPhone"
                id="phoneInput"
                type="tel"
                placeholder="Введите номер телефона"
                class="w-full px-6 py-3 mt-2 !bg-[#f0f0f5]"
                required
                ref="phoneInput"
              />

              <input
                v-model="password"
                ref="passwordInput"
                placeholder="Пароль"
                class="w-full px-6 py-3"
                v-if="show"
              />

              <button
                @click="handleClick"
                v-if="!show"
                type="submit"
                class="w-full block !text-white font-semibold px-4 login_btn"
                :class="isLoading ? '!bg-[#F0F0F5] !text-[#222222] py-2' : 'py-3'"
              >
                <div v-if="isLoading" class="flex items-center justify-center gap-2">
                  <a-spin />
                  <span class="text-[#8c8c8c]">Загружается...</span>
                </div>
                <span v-else>Продолжить</span>
              </button>

              <div v-if="show" class="code">
                <input
                  type="number"
                  ref="codeInput"
                  id="code"
                  placeholder="Введите код"
                  class="w-full px-6 py-3"
                  min="4"
                  v-model="verificationCode"
                  required
                />
                <button
                  @click="handleReset"
                  type="submit"
                  class="w-full block !text-white font-semibold px-4 py-3 mt-5 login_btn"
                  :class="isLoading ? '!bg-[#F0F0F5] !text-[#222222]' : '!py-3'"
                >
                  <div v-if="isLoading" class="flex items-center justify-center gap-10">
                    <span class="ml-2 text-[#8c8c8c]">Загрузка...</span>
                    <a-spin />
                  </div>
                  <span v-else>Изменить</span>
                </button>

                <button
                  type="button"
                  class="w-full block text-[#848282] font-semibold px-4 py-3 mt-2 bg-[#F0F0F5]"
                  :class="{
                    ' code_btn !bg-[#F0F0F5] !text-[#848282]': countdown > 0,
                    'text-white login_btn  ': countdown === 0
                  }"
                  :disabled="countdown > 0"
                  @click="handleClick"
                >
                  Получить новый код
                  <span
                    v-if="countdown > 0"
                    :class="{ 'hover:!text-[#848282] hover:!bg-[#F0F0F5]': countdown > 0 }"
                    >: {{ countdown }} с.</span
                  >
                </button>
              </div>
              <RouterLink to="/login" class="!text-[black] cursor-pointer">
                <button
                  type="button"
                  class="w-full block !text-[#8c8c8c] !bg-[#F0F0F5] font-semibold px-4 py-3 register_btn"
                >
                  Назад
                </button>
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="https://cdn.s3.finpard.io/banner.jpg" alt="" class="w-full h-full object-cover" />
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import httpServices from '../../services/http.js'
import { AUTH_URL } from '../../stores/store.js'
export default {
  setup() {
    const router = useRouter()

    const storedPhoneNumber = localStorage.getItem('phoneNumber')
    const storedShow = localStorage.getItem('show') === 'true'
    const storedCountdown = parseInt(localStorage.getItem('countdown'), 10)

    const phoneNumber = ref(storedPhoneNumber || '')
    const show = ref(storedShow)
    const password = ref('')
    const verificationCode = ref('')
    const countdown = ref(storedCountdown > 0 ? storedCountdown : 0)
    const isLoading = ref(false)

    const updateLocalStorage = (key, value) => {
      localStorage.setItem(key, value)
    }

    const clearLocalStorage = () => {
      localStorage.removeItem('phoneNumber')
      localStorage.removeItem('show')
      localStorage.removeItem('countdown')
    }
    const autoStartPhone = (event) => {
      let countryCode = '+998'

      const phoneNumberValue = event.target.value.trim()

      if (phoneNumberValue.startsWith('7')) {
        countryCode = '+7'
      } else if (phoneNumberValue.startsWith('77')) {
        countryCode = '+77'
      }

      if (phoneNumber.value.length < 4 && /^\d$/.test(phoneNumberValue)) {
        phoneNumber.value = countryCode + phoneNumberValue
      }
    }

    const startCountdown = () => {
      countdown.value = 60
      show.value = true
      updateLocalStorage('show', 'true')
      updateLocalStorage('countdown', countdown.value.toString())

      const intervalId = setInterval(() => {
        countdown.value -= 1
        updateLocalStorage('countdown', countdown.value.toString())
        if (countdown.value === 0) {
          clearInterval(intervalId)
          // show.value = false
          updateLocalStorage('show', 'false')
          localStorage.removeItem('phoneNumber')
          localStorage.removeItem('countdown')
        }
      }, 1000)
    }

    onMounted(() => {
      if (countdown.value > 0) {
        const intervalId = setInterval(() => {
          countdown.value -= 1
          updateLocalStorage('countdown', countdown.value)

          if (countdown.value <= 0) {
            clearInterval(intervalId)
            updateLocalStorage('countdown', null)
            updateLocalStorage('phoneNumber', null)
          }
        }, 1000)

        updateLocalStorage('intervalId', intervalId)
      }
    })
    const handleClick = async () => {
      if (phoneNumber.value !== '') {
        const formatPhone = `${phoneNumber.value}`
        console.log('Formatted Phone Number:', formatPhone)

        try {
          isLoading.value = true
          await fetch(`${AUTH_URL}store/reset/send_sms/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone: formatPhone })
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.status)
              if (data.status === 'Client not found') {
                message.error(' КЛИЕНТ НЕ НАЙДЕН')
              }
              if (data.status == 'SMS sent') {
                message.success(' СМС ОТПРАВЛЕНО')
                show.value = true
                localStorage.setItem('phoneNumber', phoneNumber.value)
                localStorage.setItem('show', 'true')
                startCountdown()
              }
              if (data.status == 'Please wait before sending another SMS') {
                message.error(' Пожалуйста, подождите 1 минуту, отправив еще одно SMS.')
                startCountdown()
              }
            })
          isLoading.value = false
        } catch (error) {
          message.error(' Что-то пошло не так, попробуйте еще раз')
          console.error(error)
          isLoading.value = false
        }
      } else {
        message.error(' ПОЖАЛУЙСТА, ВВЕДИТЕ СВОЙ НОМЕР ТЕЛЕФОНА')
      }
    }

    const handleReset = async () => {
      const formatPhone = phoneNumber.value
      const values = {
        phoneNumber: phoneNumber.value !== '',
        password: password.value !== '',
        verificationCode: verificationCode.value !== ''
      }
      console.log(verificationCode.value, password.value)
      try {
        isLoading.value = true
        if (Object.values(values).every((value) => value)) {
          await fetch(`${AUTH_URL}store/reset/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              phone: formatPhone,
              sms_code: verificationCode.value.toString(),
              password: password.value
            })
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.status)

              if (data.status === 'Password reset') {
                message.success(' Пароль восстановлено')
                router.push({ name: 'login' })
                localStorage.removeItem('countdown')
                localStorage.setItem('show', 'false')
              }
              if (data.status === 'SMS code is incorrect') {
                message.error(' СМС-код неверен')
              }
            })
        } else {
          message.error(' ПОЖАЛУЙСТА, ЗАПОЛНИТЕ ВСЕ ВВОДЫ')
        }
      } catch (error) {
        console.log(error)
        isLoading.value = false
      }
    }

    return {
      phoneNumber,
      countdown,
      startCountdown,
      password,
      verificationCode,
      handleClick,
      handleReset,
      show,
      autoStartPhone,
      isLoading
    }
  }
}
</script>

<style lang="scss">
.register_code {
  input::placeholder {
    color: #838388;
  }
  input {
    background-color: #f0f0f5 !important;
  }
  button {
    background-color: #f0f0f5;
    color: #2222224d;
  }
  p {
    color: red;
    font-size: 12px;
  }
}
</style>
