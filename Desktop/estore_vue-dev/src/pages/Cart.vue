<template lang="html">
  <div v-if="isLoading" class="spin w-full h-screen grid place-items-center">
    <Loader />
  </div>
  <div v-else class="bg-[#f2f2f7]">
    <!-- NAVBAR AND HEADER START -->

    <div class="navbar_basket">
      <!-- start navbar -->
      <Navbar />
      <!-- finish navbar and header  -->

      <!-- start collapse  -->
      <Collapse />
    </div>

    <!-- NAVBAR AND HEADER FINISH -->
    <!-- <a-button @click="showPromiseConfirm">With promise</a-button> -->
    <!-- BASKET EMPTY MESSAGE -->

    <div
      v-if="details.length === 0"
      class="products text-center flex flex-col justify-center items-center gap-7"
    >
      <h5 class="text-[30px]">Корзина пуста</h5>
      <p class="text-[20px] w-[100px] !text-gray-400">
        Здесь хранятся товары, которые вы добавили в корзину. Сейчас ваша корзина пуста. Загляните в
        каталог или воспользуйтесь поиском, чтобы найти всё, что нужно.
      </p>
      <a href="/" class="btn_catalog text-white grid place-items-center hover:text-white">
        Перейти на Главную
      </a>
    </div>

    <!-- PRODUCT IN Detail -->
    <div
      v-else
      class="detail_items container mx-auto flex items-start md:flex-row md:justify-between flex-col"
    >
      <div class="grid place-items-center !items-center basket_products w-full">
        <div class="flex flex-col gap-5 md:p-0 md:px-[30px] w-full px-[10px]">
          <div
            class="basket_product px-5 flex flex-col gap-5 py-3 md:w-[430px]"
            v-for="(detail, index) in details"
            :key="index"
          >
            <div class="product_value flex flex-col gap-5">
              <h1 class="px-3">В корзине {{ detail.quantity }} товар</h1>
              <div class="flex items-center justify-between">
                <div
                  class="flex justify-between w-full"
                  v-for="(detail, index) in details"
                  :key="`detail-${index}`"
                >
                  <div>
                    <img
                      class="min-w-[140px] !w-[210px] md:!h-[210px] !h-[160px]"
                      :src="'https://cdn.s3.finpard.io/' + detail.product.image"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col md:gap-[22px] gap-3">
                    <h2 class="text-[20px] font-bold">{{ detail.product.title }}</h2>
                    <span v-if="detail.product.sku !== '0'">Арт.{{ detail.product.sku }}</span>
                    <!-- <p
                      class="title"
                      v-if="detail.product.description !== ''"
                      v-html="detail.product.description"
                    ></p> -->

                    <span
                      >Размер : <span class="font-bold"> {{ detail.selectedItem.title }}</span>
                    </span>
                    <div>
                      <!-- <p class="mb-2 font-normal persent link flex gap-2">
                        <del class="mb-1 font-normal">{{ detail.product.originalPrice }} </del>
                        <span>{{ detail.discount }}</span>
                      </p> -->
                      <h4>
                        {{ formatPrice(detail.product.price) }}
                        {{ detail.product.currency }}
                      </h4>
                    </div>
                    <div class="flex items-center gap-5">
                      <div class="count flex items-center gap-4 justify-center">
                        <span
                          class="decrement_detail text-black text-[30px] cursor-pointer select-none"
                          @click="decrement(index)"
                        >
                          -
                        </span>

                        <span class="select-none">{{ detail.quantity }}</span>
                        <span
                          class="increment_detail text-[25px] cursor-pointer select-none"
                          @click="increment(index)"
                        >
                          +
                        </span>
                      </div>
                      <div class="delete_product cursor-pointer" @click="deleteProduct(index)">
                        <svg
                          width="18"
                          height="22"
                          viewBox="0 0 18 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.74 8.00003L11.394 17M6.606 17L6.26 8.00003M16.228 4.79003C16.57 4.84203 16.91 4.89703 17.25 4.95603M16.228 4.79003L15.16 18.673C15.1164 19.2383 14.8611 19.7662 14.445 20.1513C14.029 20.5364 13.4829 20.7502 12.916 20.75H5.084C4.5171 20.7502 3.97102 20.5364 3.55498 20.1513C3.13894 19.7662 2.88359 19.2383 2.84 18.673L1.772 4.79003M16.228 4.79003C15.0739 4.61555 13.9138 4.48313 12.75 4.39303M1.772 4.79003C1.43 4.84103 1.09 4.89603 0.75 4.95503M1.772 4.79003C2.92613 4.61555 4.08623 4.48313 5.25 4.39303M12.75 4.39303V3.47703C12.75 2.29703 11.84 1.31303 10.66 1.27603C9.55362 1.24067 8.44638 1.24067 7.34 1.27603C6.16 1.31303 5.25 2.29803 5.25 3.47703V4.39303M12.75 4.39303C10.2537 4.20011 7.74628 4.20011 5.25 4.39303"
                            stroke="#AFAFAF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <hr class="mt-8" /> -->
            </div>
          </div>
        </div>
      </div>

      <div class="md:flex flex-col gap-10">
        <RouterLink :to="orderRoute" class="basket_btn order_btn px-3">
          <button
            type="button"
            data-modal-toggle="authentication-modal"
            class="grid place-items-center !w-[330px] !h-[50px] text-[18px] font-bold"
            @click="onClick, showPromiseConfirm()"
          >
            Оформить заказ
          </button>
        </RouterLink>

        <div>
          <div class="text-left p-3">
            <h3 class="text-[30px] font-semibold total" v-for="(detail, index) in details">
              Итого: {{ formatPrice(total) }} {{ detail.product.currency }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER  -->

    <Footer />

    <FooterInfo class="detail_footer" />
    <!-- FOOTER  -->
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'

import Navbar from '@/components/Navbar.vue'
import Collapse from '@/components/Collapse.vue'
import Footer from '@/components/Footer.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import Loader from '@/components/Loader.vue'

import { message } from 'ant-design-vue'
import { ESTORE_URL } from '../stores/store.js'

import httpServices from '@/services/http'

export default {
  data() {
    return {
      order: [],
      modalBasket: null,
      name: '',
      tel: '',
      total: 0,
      price: 0,
      isAuthenticated: httpServices.session.get(),
      productCount: 0,
      isLoading: false
    }
  },
  methods: {
    formatPrice(price) {
      if (price === undefined || isNaN(price)) return '0'
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    async showPromiseConfirm() {
      const token = httpServices.session.get()
      if (token) {
        const self = this
        Modal.confirm({
          title: 'Вы действительно хотите сделать заказ?',
          okText: 'Да',
          cancelText: 'Отмена',
          async onOk() {
            // Assume this.isLoading exists somewhere in your component's data
            // this.isLoading = true;

            try {
              // Construct the request body object
              const requestBody = {
                products: self.order
              }

              // Log the request body object before stringifying
              // console.log('Sending Order:', JSON.stringify(requestBody))

              await fetch(ESTORE_URL + 'store/order/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === 'Company not found') {
                    // Assume this.isLoading is reactive
                    // this.isLoading = false;
                    message.error('Что-то пошло не так, попробуйте еще раз')
                  } else {
                    message.success('Заказ успешно отправлен')
                    // this.isLoading = false; // Make sure to handle loading state correctly
                  }
                })
            } catch (error) {
              message.error('Что-то пошло не так')
              console.error(error)
              // this.isLoading = false; // Make sure to handle loading state correctly
            }
          },
          onCancel() {}
        })
      }
    },
    addProductToCart(product) {
      const index = this.details.findIndex((p) => p.slug === product.slug)
      if (index !== -1) {
        this.details[index].quantity += 1
      } else {
        this.details.push({ ...product, quantity: 1 }),
          this.order.push({ quantity: 1, slug: this.details.product.slug })
      }
    },
    calculateTotal() {
      this.total = this.details.reduce((acc, detail) => {
        return acc + detail.product.price * detail.quantity
      }, 0)
    },
    increment(index) {
      const detail = this.details[index]
      ;(detail.quantity += 1), this.calculateTotal()
    },
    decrement(index) {
      const detail = this.details[index]
      detail.quantity -= 1
      if (detail.quantity === 0) {
        this.details.splice(index, 1)
      }
    },

    deleteProduct(index) {
      this.details.splice(index, 1)
    },

    onClick() {
      const token = httpServices.session.get()
      if (!token) {
        this.modalBasket = document.querySelector('.modal_basket')
        if (this.modalBasket) {
          this.modalBasket.classList.replace('hidden', 'grid')
        }
      }
    },
    closeModal() {
      if (this.modalBasket) {
        this.modalBasket.classList.replace('grid', 'hidden')
      }
    }
  },
  mounted() {
    console.log(this.order)
    console.log("Store'dagi mahsulotlar:", this.$store.getters.allDetails)
    this.calculateTotal()
    console.log(this.details)
    this.details.forEach((detail) => {
      this.order.push({ quantity: detail.quantity, slug: detail.product.slug })
    })
    console.log(this.order)
  },
  computed: {
    orderRoute() {
      return this.isAuthenticated ? '/cart' : '/login'
    },
    details() {
      return this.$store.getters.allDetails
    }
  },

  components: {
    Navbar,
    Footer,
    FooterInfo,
    Collapse
  }
}
</script>

<style lang="scss">
.button,
[type='button'] {
  background-color: #07a461 !important;
  color: white !important;
}
.button,
[type='button'] :hover {
  background-color: #07a461 !important;
  border: none;
  color: white !important;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn {
  border: none;
  color: white;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn:hover {
  color: white !important;
}
.detail_items {
  gap: 30px;
  padding-top: 50px;
}

.btn_catalog {
  width: 162px;
  height: 50px;
  border-radius: 15px;
  background-color: #07a461;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
}
.products {
  min-height: 80vh;
  h5 {
    font-weight: 500;

    line-height: 16px;
  }
  p {
    width: 380px;
    font-weight: 400;

    line-height: 30px;
    color: #222222;
  }
}
@media (max-width: 1023px) {
  .basket_product {
    width: 100%;
  }
  .total {
    font-size: 25px !important;
  }
  h4 {
    font-size: 18px !important;
  }
}
@media (max-width: 767px) {
  .basket_product {
    width: 100%;
    // min-height: 100vh;
    border-radius: 25px;
    background-color: white;
  }

  .product_value {
    img {
      width: 150px !important;
    }
  }
  h4 {
    font-size: 18px !important;
  }
}

.basket_product {
  max-width: 820px;
  // min-height: 100vh;
  border-radius: 25px;
  background-color: white;
}

.basket_products {
  padding-top: 6px;
  margin-bottom: 65px;
}

.product_value {
  h1 {
    font-size: 25px;
    font-weight: 700;
    line-height: 27px;
  }
  img {
    width: 200px;
  }
  // span {
  //   font-weight: 400;
  //   font-size: 14px;
  //   line-height: 14px;
  //   color: #8c8c8c;
  //   b {
  //     color: black;
  //   }
  // }
  .title {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
  }
  h4 {
    font-weight: 600;
    font-size: 23px;
    line-height: 20px;
  }
}

.notification {
  position: absolute;
  top: 10px;
  margin-left: 20px;
  width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  color: white;
  border-radius: 50%;
  background-color: #cc2e19;
}

.count {
  width: 100px;
  height: 36px;
  border-radius: 12px;
  padding: 7px 8px;
  background-color: #f1f2f0;
}

.link span {
  color: #cc2e19;
}

.delete_product path {
  stroke: #cc2e19;
}

.order_product {
  width: 320px;
  height: 40px;
  padding: 8px, 32px, 8px, 32px;
  border-radius: 15px;
  color: white;
  background-color: #07a461;
  margin-top: 20px;
}

.basket_btn {
  width: 400px;
  height: 80px;
  border-radius: 25px;
  display: grid;
  place-content: center;
  button {
    width: 360px;
    height: 40px;
    background-color: #07a461;
    color: white;
    border-radius: 15px;
  }
}
.close_btn {
  position: absolute;
  right: -5px;
  top: -30px;
}
.modal {
  width: 400px;
  height: 350px;
  border-radius: 25px;

  h3 {
    font-size: 22px;
    font-weight: 700;
    line-height: 27px;
  }
  input {
    width: 300px;
    outline: none;
    border-radius: 15px;
    height: 50px;
  }
  input:focus {
    border: 1px solid #07a461;
  }
  button:hover {
    background-color: none !important;
  }
  input::placeholder {
    font-size: 13px;
  }
  .send_btn {
    width: 100%;
    height: 40px;
    background-color: #07a461;
    color: white;
    border-radius: 15px;
  }
}

.detail_footer {
  border-top: 1px solid #dbdbe0;
  padding-bottom: 30px;
}

@media (max-width: 1280px) {
  .detail_items {
    padding-top: 30px;
    button {
      width: 300px;
      height: 40px;
    }
  }
}

@media (max-width: 1023px) {
  .basket_btn {
    width: 250px;
  }
  .detail_items {
    padding-top: 30px;
    button {
      width: 220px;
      height: 40px;
    }
  }
}
@media (max-width: 885px) {
  .detail_items {
    padding-top: 30px;
    button {
      width: 200px;
      height: 40px;
    }
    h3 {
      font-size: 20px !important;
    }
  }
  .modal {
    width: 350px;
    height: 350px;
    border-radius: 25px;
    // margin-top: -20px;

    h3 {
      font-size: 22px;
      font-weight: 700;
      line-height: 27px;
    }
    input {
      outline: none;
      border-radius: 15px;
      height: 50px;
    }
    input:focus {
      border: 1px solid #07a461;
    }
    button:hover {
      background-color: none !important;
    }
    input::placeholder {
      font-size: 13px;
    }
    .send_btn {
      width: 100%;
      height: 40px;
      background-color: #07a461;
      color: white;
      border-radius: 15px;
    }
  }
}
@media (max-width: 768px) {
  .navbar_basket {
    nav {
      // height: 134px;
      border-bottom-right-radius: 25px;
      border-bottom-left-radius: 25px;
    }
  }
}

@media (max-width: 767px) {
  .detail_items {
    padding-top: 20px;
  }
  .detail_footer {
    padding-bottom: 150px;
  }
  .basket_btn {
    width: 100%;
    position: fixed;
    bottom: 60px;
    border-radius: 0;
  }
}

@media (max-width: 320px) {
  .basket_btn {
    padding: 0 10px;
  }
}
</style>
