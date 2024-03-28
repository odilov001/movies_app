<template lang="html">
  <div v-if="isLoading" class="spin w-full h-screen grid place-items-center">
    <Loader />
  </div>
  <div class="bg-white w-full" v-else>
    <!-- navbar  -->
    <Navbar />
    <!--  navbar  -->

    <!-- ALL PRODUCTS  -->
    <div
      class="all_product bg-white container mx-auto mt-5"
      v-for="(category, idx) in categories"
      :key="idx"
    >
      <div class="title_product">
        <RouterLink to="/">Все украшения</RouterLink>
        <div class="flex items-center gap-4">
          <h1 class="!text-[34px] !leading-10">{{ category.title }}</h1>
          <span class="count grid place-items-center" :key="idx">
            {{ category.products.length }} {{ getProductWord(category.products.length) }}
          </span>
        </div>
        <!-- start button group -->
        <!-- <div class="md:hidden block">
          <div class="btn_group">
            <button>{{ category.title }}</button>
          </div>
        </div> -->
        <!-- finish button group -->
      </div>

      <div class="container mx-auto">
        <!-- rings cards -->
        <div class="">
          <div class="bg-white all_products" v-for="(category, idx) in categories" :key="idx">
            <div
              class="card md:w-[210px]"
              v-for="(product, index) in category.products"
              :key="index"
            >
              <RouterLink :to="'/product/' + product.slug">
                <img
                  class="rounded-t-lg w-full object-cover"
                  :src="'https://cdn.s3.finpard.io/' + product.imageSrc"
                />
              </RouterLink>

              <div class="text break-all font-[400] text-[13px] mt-1 leading-[16px] text-[#222222]">
                <h5 class="mb-2 price font-[700] !text-[20px] leading-[22px]">
                  {{ formatPrice(product.price) }} {{ category.currency }}
                </h5>
                <h4 class="text-[18px] font-[500]">{{ product.title }}</h4>
                <!-- <p class="mb-2 font-normal persent link flex gap-2">
                  <del class="mb-1 font-normal">{{ formatPrice(product.originalPrice) }} </del>
                  <span>{{ product.discount }} </span>
                </p> -->
                <!-- <RouterLink to="/" class="font-normal text">{{ product.description }}</RouterLink> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="categories.length === 0" class="w-full h-[396px] grid place-items-center">
      <a-empty>
        <template #description>
          <div class="text-[20px] font-bold text-gray-400">НЕТ ПРОДУКТОВ</div>
        </template>
      </a-empty>
    </div>

    <!-- FOOTER  -->

    <Footer />
    <FooterInfo class="products_footer" />

    <!-- FOOTER  -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import BtnGroup from '@/components/Btn-group.vue'
import Footer from '@/components/Footer.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import Loader from '@/components/Loader.vue'
import { ESTORE_URL } from '../stores/store.js'
import images from './images'
import axios from 'axios'
import httpServices from '@/services/http'

const props = defineProps({
  slug: String
})

const categories = ref([])
const isLoading = ref(true)

const router = useRouter()

onMounted(async () => {
  try {
    const response = await fetch(`${ESTORE_URL}category/${props.slug}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Page Not Found')
    }
    const data = await response.json()
    categories.value = data
      .filter((item) => item.products && item.products.length > 0)
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        currency: item.currency,
        products: item.products.map((product) => ({
          slug: product.slug,
          imageSrc: product.image,
          price: product.price,
          originalPrice: '',
          discount: '',
          title: product.title
        })),
        moreButtonText: 'Больше предложений'
      }))
  } catch (error) {
    console.error(error)
    router.push({ name: 'home' })
  } finally {
    isLoading.value = false
  }
})

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const getProductWord = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'товар'
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'товара'
  } else {
    return 'товаров'
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 210px;
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
.all_products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 30px;
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
@media (max-width: 1280px) {
  .all_products {
    display: grid;
    grid-template-columns: repeat(4, 1fr) !important;
    padding: 0 10px;
    gap: 10px;
  }
}
@media (max-width: 1023px) {
  .all_products {
    display: grid;
    grid-template-columns: repeat(3, 1fr) !important;
    padding: 0 10px;
    gap: 10px;
  }
}

@media (max-width: 767px) {
  .all_products {
    display: grid;
    grid-template-columns: repeat(3, 1fr) !important;
    row-gap: 40px;
  }
}
@media (max-width: 600px) {
  .all_products {
    display: grid;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (max-width: 420px) {
}
@media (max-width: 400px) {
  .card {
    width: 175px;
  }
  .all_products {
    display: grid;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (max-width: 360px) {
  .all_products {
    .rings {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
  .card {
    width: 100%;
  }
  .all_products {
    display: grid;
    grid-template-columns: 1fr !important;
  }
}
</style>
