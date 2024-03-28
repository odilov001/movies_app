<template>
  <section class="flex flex-col md:flex-row h-screen items-center register_code">
    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100 flex flex-col gap-5">
        <div>
          <h1 class="text-xl md:text-2xl font-bold leading-tight mb-[30px] text-center">
            Регистрация
          </h1>

          <form @submit.prevent action="#">
            <div class="flex flex-col gap-2">
              <input
                v-model="firstName"
                ref="firstNameInput"
                placeholder="Имя"
                class="w-full px-6 py-3"
                required
                v-if="showTag"
              />
              <input
                v-model="lastName"
                ref="lastNameInput"
                placeholder="Фамилия"
                class="w-full px-6 py-3"
                required
                v-if="showTag"
              />
              <input
                v-model="phoneNumber"
                @input="autoStartPhone"
                id="phoneInput"
                type="tel"
                placeholder="Введите номер телефона"
                class="w-full px-6 py-3 mt-2"
                required
                ref="phoneInput"
              />

              <input
                v-model="password"
                ref="passwordInput"
                placeholder="Пароль"
                class="w-full px-6 py-3"
                v-if="showTag"
              />

              <button
                :disabled="countSecund > 0"
                @click="handleClick"
                v-if="!showTag"
                type="submit"
                class="w-full block !text-white font-semibold px-4 py-[8px] login_btn"
                :class="isLoading || countSecund > 0 ? '!bg-[#F0F0F5] !text-[#8c8c8c]' : '!py-3'"
              >
                <div v-if="isLoading" class="flex items-center justify-center gap-10">
                  <span class="ml-2 text-[#8c8c8c]">Загрузка...</span>
                  <a-spin />
                </div>
                <span v-else-if="countSecund === 0">Продолжить</span>
                <span v-if="countSecund > 0"> Получить новый код : {{ countSecund }} с.</span>
              </button>

              <div v-if="showTag" class="code">
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
                  type="submit"
                  @click="handleRegistration"
                  class="w-full block !text-white font-semibold px-4 py-3 mt-5 login_btn"
                  :class="isLoading2 ? '!bg-[#F0F0F5] !text-[#222222]' : '!py-3'"
                >
                  <div v-if="isLoading2" class="flex items-center justify-center gap-10">
                    <span class="ml-2 text-[#8c8c8c]">Загружается...</span>
                    <a-spin />
                  </div>
                  <span v-else>Зарегистрироваться</span>
                </button>

                <button
                  :disabled="countSecund > 0"
                  @click="handleClick"
                  type="submit"
                  class="w-full block !text-white font-semibold px-4 py-[8px] login_btn mt-4"
                  :class="
                    isLoading || countSecund > 0 ? '!bg-[#F0F0F5] !text-[#8c8c8c] !py-3' : '!py-3'
                  "
                >
                  <div v-if="isLoading" class="flex items-center justify-center gap-10">
                    <span class="ml-2 text-[#8c8c8c]">Загрузка...</span>
                    <a-spin />
                  </div>
                  <span v-else-if="countSecund === 0">Получить новый код</span>
                  <span v-if="countSecund > 0"> Получить новый код : {{ countSecund }} с.</span>
                </button>
              </div>
              <RouterLink to="/login" class="!text-[black] cursor-pointer mt-2">
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
  data() {
    return {}
  },
  setup() {
    const router = useRouter()
    const storedPhoneNumber = localStorage.getItem('phoneNumber')
    const phoneNumber = ref(storedPhoneNumber || '')
    const countSecund = ref(parseInt(localStorage.getItem('countSecund'), 10) || 0)
    const showTag = ref(JSON.parse(localStorage.getItem('showTag')) || false)
    const isLoading = ref(false)
    const isLoading2 = ref(false)
    const firstName = ref('')
    const lastName = ref('')
    const password = ref('')
    const verificationCode = ref('')

    const updateLocalStorage = (key, value) => {
      localStorage.setItem(key, value)
    }

    const startCountdown = () => {
      countSecund.value = 60
      updateLocalStorage('countSecund', countSecund.value)
      updateLocalStorage('showTag', true)

      const intervalId = setInterval(() => {
        countSecund.value -= 1
        updateLocalStorage('countSecund', countSecund.value)

        if (countSecund.value <= 0) {
          clearInterval(intervalId)
          updateLocalStorage('countSecund', null)
          updateLocalStorage('phoneNumber', null)
          updateLocalStorage('showTag', false)
        }
      }, 1000)
    }

    const handleClick = async () => {
      if (phoneNumber.value !== '') {
        const formatPhone = `${phoneNumber.value}`
        updateLocalStorage('phoneNumber', phoneNumber.value)

        console.log('Formatted Phone Number:', formatPhone)

        try {
          isLoading.value = true
          await fetch(`${AUTH_URL}store/register/send_sms/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone: formatPhone })
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.status)

              if (data.status == 'SMS sent') {
                message.success(' СМС ОТПРАВЛЕНО')
                showTag.value = true
                startCountdown()
              }
              if (data.status == 'Company not found') {
                message.error('Company not found')
              }
              if (data.status == 'SMS code is incorrect') {
                message.error(' СМС-код неверен')
              }
              if (data.status == 'Please wait before sending another SMS') {
                message.error(' Пожалуйста, подождите 1 минуту, отправив еще одно SMS.')
                startCountdown()
              }
              if (data.status == 'Client already exists') {
                message.error(' Клиент уже существует')
                router.push({ name: 'login' })
              }
            })
          isLoading.value = false
        } catch (error) {
          message.error(' Что-то пошло не так, попробуйте еще раз')
          console.error(error)
          isLoading.value = true
        }
      } else {
        message.error(' ПОЖАЛУЙСТА, ВВЕДИТЕ СВОЙ НОМЕР ТЕЛЕФОНА')
        isLoading.value = true
      }
    }

    const handleRegistration = async () => {
      const formatPhone = `${phoneNumber.value}`
      const values = {
        phoneNumber: phoneNumber.value !== '',
        firstName: firstName.value !== '',
        lastName: lastName.value !== '',
        password: password.value !== '',
        verificationCode: verificationCode.value !== ''
      }

      try {
        isLoading2.value = true
        if (Object.values(values).every((value) => value)) {
          await fetch(`${AUTH_URL}store/register/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              phone: formatPhone,
              sms_code: verificationCode.value.toString(),
              first_name: firstName.value,
              last_name: lastName.value,
              password: password.value
            })
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.status)
              if (data.status === 'Registered') {
                message.success(' Вы Успешно  Зарегистрирован')
                router.push({ name: 'login' })
                localStorage.removeItem('countSecund')
              }
              if (data.status === 'Client already exists') {
                message.error(' Клиент уже существует')
              }
              if (data.status === 'SMS code is incorrect') {
                message.error(' СМС-код неверен')
              }
            })
        } else {
          message.error(' ПОЖАЛУЙСТА, ЗАПОЛНИТЕ ВСЕ ВВОДЫ')
          isLoading2.value = true
        }
      } catch (error) {
        isLoading2.value = false
        console.log(error)
      }
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

    onMounted(() => {
      if (countSecund.value > 0) {
        const intervalId = setInterval(() => {
          countSecund.value -= 1
          updateLocalStorage('countSecund', countSecund.value)

          if (countSecund.value <= 0) {
            clearInterval(intervalId)
            updateLocalStorage('countSecund', null)
          }
        }, 1000)

        updateLocalStorage('intervalId', intervalId)
      }
    })
    return {
      phoneNumber,
      firstName,
      lastName,
      password,
      verificationCode,
      handleClick,
      handleRegistration,
      showTag,
      startCountdown,
      countSecund,
      autoStartPhone,
      isLoading,
      isLoading2
    }
  }
}
</script>

<style lang="scss">
.register_code {
  input::placeholder {
    color: #838388;
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
