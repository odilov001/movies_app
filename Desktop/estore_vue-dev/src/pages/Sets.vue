<template lang="html">
  <div v-if="isLoading" class="spin w-full h-screen grid place-items-center">
    <Loader />
  </div>
  <div v-else class="single-product">
    <!-- NAVBAR AND HEADER  -->

    <div class="topbar">
      <!--  navbar and header  -->
      <Navbar />
      <!-- start collapse  -->
      <Collapse />
    </div>

    <!-- NAVBAR AND HEADER  -->

    <!--   SINGLE PRODUCT  -->

    <div class="single_product md:gap-20 w-full flex items-center justify-center container mx-auto">
      <div class="slider_ring">
        <div
          class="flex md:flex-row flex-col md:gap-20 gap-5 items-center"
          :class="product.images ? 'mt-5' : ''"
        >
          <div class="flex md:flex-col flex-row md:gap-10 gap-10"></div>
          <div class="main_img">
            <img
              class="!w-[400px] !h-[400px]"
              :src="'https://cdn.s3.finpard.io/' + product.imageSrc"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="product_information flex items-start flex-col gap-3 md:gap-7">
        <div class="flex flex-col gap-3 product_price bg-white w-full">
          <p class="product_title md:mt-0 mt-5">{{ product.title }}</p>

          <h2>{{ formatPrice(+product.price) }} {{ product.currency }}</h2>
          <p class="data" v-if="product.sku !== '0'">Арт. {{ product.sku }}</p>
        </div>

        <div class="px-5 basket_btn">
          <RouterLink to="#" class="add_product grid place-items-center" @click.prevent="addToCart">
            Добавить в корзину
          </RouterLink>
        </div>
        <div class="description flex flex-col gap-3 bg-white rounded-[25px]">
          <h4>Описание:</h4>
          <p v-html="product.description"></p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3 md:ml-[200px] md:p-0 p-5 bg-white mt-3 rounded-[25px]">
      <div class="flex gap-2 min-w-[300px]">
        <img
          class="!w-[123px] !h-[123px] cursor-pointer"
          src="https://cdn.s3.finpard.io/media/product_images/9Je1QHBvmwWa_slFc4_JAQKKk5lKjB.webp"
          alt=""
        />
        <div class="flex flex-col gap-3">
          <h2 class="text-[25px] font-[500]">Sirg'a</h2>
          <p>Размер: <b>17.7 </b></p>
          <p>Вес: <b>2.32</b></p>
          <p>
            цена: <b>{{ formatPrice(2000000) }}</b>
          </p>
        </div>
      </div>
      <div class="flex gap-2 min-w-[300px]">
        <img
          class="!w-[123px] !h-[123px] cursor-pointer"
          src="https://cdn.s3.finpard.io/media/product_images/9Je1QHBvmwWa_slFc4_JAQKKk5lKjB.webp"
          alt=""
        />
        <div class="flex flex-col gap-3">
          <h2 class="text-[25px] font-[500]">Sirg'a</h2>
          <p>Размер: <b>17.7 </b></p>
          <p>Вес: <b>2.32</b></p>
          <p>
            цена: <b>{{ formatPrice(2000000) }}</b>
          </p>
        </div>
      </div>
      <div class="flex gap-2 min-w-[300px]">
        <img
          class="!w-[123px] !h-[123px] cursor-pointer"
          src="https://cdn.s3.finpard.io/media/product_images/9Je1QHBvmwWa_slFc4_JAQKKk5lKjB.webp"
          alt=""
        />
        <div class="flex flex-col gap-3">
          <h2 class="text-[25px] font-[500]">Sirg'a</h2>
          <p>Размер: <b>17.7 </b></p>
          <p>Вес: <b>2.32</b></p>
          <p>
            цена: <b>{{ formatPrice(2000000) }}</b>
          </p>
        </div>
      </div>
    </div>

    <!--   SINGLE PRODUCT  -->

    <!-- FOOTER  -->
    <Footer />
    <FooterInfo />
    <!-- FOOTER  -->
  </div>
</template>
<script>
import { RouterLink } from 'vue-router'
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Collapse from '@/components/Collapse.vue'
import Footer from '@/components/Footer.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import Loader from '@/components/Loader.vue'
import { ESTORE_URL } from '../stores/store.js'
import { message } from 'ant-design-vue'

// import { userRouter } from 'vue-router'

import images from './images'
import httpServices from '../services/http.js'
export default {
  props: ['slug'],
  data() {
    return {
      product: {
        images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
        imageSrc: 'default.jpg' // Asosiy rasm
      },
      product: {},
      isLoading: false,
      // slug: '',
      variants: [],
      activeSlug: null,
      products: [],
      selectedVariantType: '',

      detailVariant: ''
    }
  },
  components: {
    Navbar,
    Collapse,
    RouterLink,
    FooterInfo,
    Footer,
    Loader
  },

  async mounted() {
    this.isLoading = true

    // this.slug = localStorage.getItem('slug')
    const urlParams = new URLSearchParams(window.location.search)
    this.activeSlug = urlParams.get('activeItem')
    try {
      const response = await fetch(`${ESTORE_URL}product/${this.slug}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log(data)
      console.log(data.product_data.image)
      if (data.status === 'Company not found') {
        this.isLoading = true
      }

      const item = data.product_data
      // console.log(item)
      this.product = {
        title: data.product_data.title,
        price: data.product_data.price,
        originalPrice: '',
        imageSrc: data.product_data.image,
        discount: '',
        description: data.product_data.description,
        sku: data.product_data.sku,
        slug: data.product_data.slug,
        variant: data.product_data.variants,
        images: data.product_data.images,
        currency: data.product_data.currency
      }

      this.variants = item.variants.map((variant) => ({
        type: variant.type,
        items: variant.items.map((item) => ({
          title: item.variant_title,
          slug: item.slug
        }))
      }))

      this.isLoading = false
    } catch (error) {
      console.error(error)
      this.isLoading = true
      this.$router.push('/')
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    setMainImage(selectedIndex) {
      const previousMainImage = this.product.imageSrc
      this.product.imageSrc = this.product.images[selectedIndex]
      this.product.images.splice(selectedIndex, 1, previousMainImage)
    },
    addToCart() {
      let selectedItem = null

      this.variants.forEach((variant) => {
        variant.items.forEach((item) => {
          if (item.slug === this.activeSlug) {
            selectedItem = {
              title: item.title,
              slug: item.slug
            }

            this.selectedVariantType = variant.type
          }
        })
      })

      if (selectedItem) {
        this.$store.dispatch('saveSelectedProductInfo', {
          selectedItem: selectedItem,
          activeSlug: this.activeSlug,
          product: {
            category: this.product.category,
            currency: this.product.currency,
            description: this.product.description,
            image: this.product.imageSrc,
            price: this.product.price,
            sku: this.product.sku,
            slug: this.product.slug,
            title: this.product.title,
            uom: this.product.uom
          },
          selectedVariantType: this.selectedVariantType,
          detailVariant: this.detailVariant
        })

        message.success('Товар добавлен в корзину!')
        this.$router.push('/cart')
      } else if (this.selectedVariantType === '') {
        message.error('Пожалуйста, выберите вариант типа товара')
      } else if (this.variants === '') {
        this.$store.dispatch('saveSelectedProductInfo', {
          selectedItem: selectedItem,
          activeSlug: this.activeSlug,
          product: {
            category: this.product.category,
            currency: this.product.currency,
            description: this.product.description,
            image: this.product.imageSrc,
            price: this.product.price,
            sku: this.product.sku,
            slug: this.product.slug,
            title: this.product.title,
            uom: this.product.uom
          },
          selectedVariantType: this.selectedVariantType,
          detailVariant: this.detailVariant
        })
        message.success('Товар добавлен в корзину!')

        this.$router.push('/cart')
      }
    }
  },
  computed: {
    ...mapGetters(['allDetails', 'totalQuantity', 'totalPrice'])
  }
}
</script>
<style lang="scss">
img {
  border-radius: 5px;
}
ul li {
  margin-left: 20px;
}

li::before {
  content: '• ';
  color: rgb(0, 0, 0);
  font-weight: bold;
}
.slider-container > * {
  display: grid;
  place-content: center;
}
.size.active {
  background-color: #ffffff !important;
  color: #05a160;
}
.single_product {
  margin-top: 10px;
  img {
    width: 400px;
    height: 500px;
  }
  .single_slider {
    width: 545px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  button {
    background: none;
  }
}

.product_information {
  width: 640px;
  padding: 20px;
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
  span,
  del {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
  del {
    color: #8c8c8c;
  }

  h2 {
    font-weight: 700;
    font-size: 25px;
    line-height: 21px;
    color: #222222;
  }

  .data {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -3%;
  }

  .product_title {
    font-size: 30px;
    line-height: 40px;
  }
}

.product_sizes {
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 14px;
    color: #8c8c8c;
  }

  .size:hover {
    border: 1px solid #05a160;
    background-color: white;
  }
  .active {
    border: 1px solid #05a160;
    background-color: white;
  }
  .product_sizes {
    width: 375px;
    max-height: 160px;
  }
}

.size {
  width: auto;
  padding: 0 10px;
  height: 37px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 1px solid none;
  background-color: #f1f2f0;
  cursor: pointer;
}

.description {
  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }

  p {
    font-weight: 400px;
    font-size: 13px;
    line-height: 18px;
    color: #222222;
  }
}

.add_product {
  width: 400px;
  min-height: 40px;
  border-radius: 15px;
  padding: 8px 32px;
  background-color: #07a461 !important;
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
}

.add_product:hover {
  color: white;
}

@media (max-width: 1023px) {
  .single_slider {
    width: 400px !important;
  }
  .add_product {
    width: 260px;
  }
}
@media (max-width: 885px) {
  .top_title {
    width: 100%;
    height: 40px;
    margin-top: -10px;
  }
  .product_information {
    width: 100%;
    padding: 0;
    .add_product {
      padding: 0 20px;
    }
    #footer_single_product {
      padding-bottom: 160px !important;
    }
  }
  .add_product {
    width: 330px;
    height: 50px;
    font-size: 16px;
  }

  .product_title {
    font-size: 20px !important;
    line-height: 20px;
  }
  .product_information h2 {
    font-size: 20px;
  }
  .description {
    width: 100%;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  .single_product {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .single-product .footer_info {
    padding-bottom: 160px;
  }
  .slider_ring {
    width: 100%;
    display: grid;
    place-items: center;
    background-color: white;
  }
  .title_product {
    padding-left: 10px;
  }
  .single_product {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: -10px;
  }

  .single_slider {
    width: 80% !important;

    margin: 0;
  }
  .description {
    width: 100%;

    padding: 20px;
  }

  .product_price {
    width: 100%;

    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    margin-top: 0;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  .product_sizes {
    width: 100%;
    padding: 20px;
    border-radius: 25px;
  }
}
</style>
