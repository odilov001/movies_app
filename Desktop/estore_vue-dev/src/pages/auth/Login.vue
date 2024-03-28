<template>
  <section class="flex flex-col md:flex-row h-screen items-center login_email">
    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100 flex flex-col gap-5">
        <div>
          <h1 class="text-xl md:text-2xl font-bold leading-tight text-center">Вход в профиль</h1>
          <form class="mt-6 form_login" action="#" @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2">
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
              <p class="text-red-500 text-[13px]">{{ phoneNumberField.errorMessage }}</p>

              <div class="flex items-center relative">
                <input
                  v-model="password"
                  placeholder="Пароль"
                  class="w-full px-6 py-3"
                  required
                  ref="passwordInput"
                />
              </div>
              <p class="text-red-500 text-[13px]">{{ passwordField.errorMessage }}</p>
              <button
                type="submit"
                class="w-full block text-white font-semibold px-4 py-[8px] login_btn"
                :class="isLoading ? '!bg-[#F0F0F5] !text-[#222222]' : '!py-3'"
              >
                <div v-if="isLoading" class="flex items-center justify-center gap-10">
                  <span class="ml-2 text-[#8c8c8c]">Загрузка...</span>
                  <a-spin />
                </div>
                <span v-else>Войти</span>
              </button>
              <RouterLink to="/register">
                <button
                  type="button"
                  class="w-full block text-white font-semibold px-4 py-3 mt-2 register_btn"
                  @click="handleRegister"
                >
                  Зарегистрироваться
                </button>
              </RouterLink>
              <RouterLink to="/reset" class="text-center mt-3">
                Забыли пароль? Сбросить
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
  <Footer />
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'

import * as yup from 'yup'
import { message } from 'ant-design-vue'
import httpServices from '../../services/http.js'
import Footer from '@/components/Footer.vue'
// import { useEStore } from '@/stores/store.js'
import { AUTH_URL } from '@/stores/store.js'
// import IMask from 'imask'

export default {
  setup() {
    const router = useRouter()

    const phoneNumber = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const validationSchema = yup.object().shape({
      password: yup
        .string()
        .required('Пароль обязателен')
        .min(6, 'Пароль не должен быть короче 6 символов')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)/,
          'Пароль должен содержать как минимум одну букву и одну цифру'
        ),
      phoneNumber: yup.string().required('Номер телефона обязателен')
    })

    const { handleSubmit } = useForm({
      initialValues: {
        password: '',
        phoneNumber: ''
      },
      validationSchema
    })

    const phoneNumberField = useField('phoneNumber', validationSchema)
    const passwordField = useField('password', validationSchema)

    const onSubmit = async () => {
      const numericOnly = phoneNumber.value.replace(/\D/g, '')
      const formatPhone = `+${numericOnly}`

      console.log('Formatted Phone Number:', formatPhone)
      console.log(password.value)
      try {
        isLoading.value = true
        await fetch(`${AUTH_URL}store/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: formatPhone,
            password: password.value
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            if (data.token) {
              httpServices.session.add(data.token)
            }
            if (data.status === 'Client not found') {
              message.error('Клиент не найден. Пожалуйста, зарегистрируйтесь')
            } else if (data.status === 'Password is incorrect') {
              message.error('Неверный пароль')
            } else if (data.status === 'Logged in') {
              message.success(' ВЫ УСПЕШНО ВОЙТИ В СИСТЕМУ')
              router.push('/')
              const firstName = localStorage.getItem('name')
              localStorage.setItem('firstName', firstName)
              console.log(firstName)
              localStorage.setItem('show', 'false')
              localStorage.removeItem('countdown')
            }
          })

        // await eStore.loginUser({ phone: formatPhone, password: password.value })
      } catch (error) {
        isLoading.value = false
        // message.error('Не удалось войти в систему. Повторите попытку позже.')
        console.error(error)
      }
    }
    const autoStartPhone = (event) => {
      let countryCode = '+998'

      const phoneNumberValue = event.target.value.trim()

      if (phoneNumber.value.length < 4 && /^\d$/.test(phoneNumberValue)) {
        phoneNumber.value = countryCode + phoneNumberValue
      }
    }

    return {
      phoneNumber: phoneNumberField.value,
      password: passwordField.value,
      phoneNumber,
      password,
      phoneNumberField,
      passwordField,
      handleSubmit,
      onSubmit,
      autoStartPhone,
      isLoading
    }
  },
  components: {
    Footer
  }
}
</script>
<style lang="scss">
.ant-spin-dot-item {
  background-color: #07a461 !important; /* Change this color as needed */
}
.login,
.login_code,
.register_code,
.login_email,
.delete_password {
  .login_btn {
    background-color: #07a461;
  }
  .register_btn {
    background: #07a46129;
    color: #07a461;
  }
  input,
  button {
    border-radius: 15px;
  }
  input {
    outline: none;
    background-color: #f0f0f5;
  }
  a {
    color: #07a461;
  }
  input::placeholder {
    color: black;
  }
  .collapse a {
    color: #222222;
  }
  .collapse a:hover {
    color: #07a461;
  }
}

.login_code {
  .code_btn {
    background-color: #f0f0f5;
    color: #2222224d;
  }

  p {
    font-size: 12px;
  }
}

.foot {
  width: 100%;
  height: 70px;
  background-color: white;

  border-top: 1px solid #8c8c8c;
  padding: 0 1rem;

  a:hover p {
    color: #07a461;
  }
  p {
    font-size: 10px;

    color: #8c8c8c;
  }
}

.login_email {
  input::placeholder {
    font-weight: 400;
    line-height: 22px;
    color: #838388;
  }
}

.delete_password {
  p {
    font-size: 12px;

    color: #222222;
  }

  input::placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #838388;
  }
}
</style>
