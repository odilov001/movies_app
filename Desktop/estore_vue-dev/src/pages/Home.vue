<template lang="html">
  <div v-if="isLoading" class="spin w-full h-screen grid place-items-center">
    <Loader />
  </div>
  <main v-else>
    <Navbar />

    <div class="home_page">
      <div class="container mx-auto header md:block bg-white">
        <!-- <div
          class="slide mt-2 swiffy-slider slider-nav-visible slider-nav-touch slider-indicators-round slider-indicators-highlight slider-indicators-sm slider-indicators-dark slider-nav-autoplay"
        >
          <ul class="slider-container">
            <li v-for="(slide, index) in slides" :key="index">
              <div :id="'slide' + (index + 1)">
                <img class="header_img" :src="slide.imageSrc" :alt="'slide' + (index + 1)" />
              </div>
            </li>
          </ul>
          <ul class="slider-indicators">
            <li
              v-for="(slide, index) in slides"
              :key="index"
              :class="{ active: index === activeSlideIndex }"
            ></li>
          </ul>
        </div> -->

        <div>
          <div class="md:hidden block">
            <div class="btn_group">
              <button v-for="(category, idx) in categories" :key="idx">
                <a
                  :href="'#section_' + idx"
                  @click.prevent="scrollToSection(idx)"
                  class="hover:text-white"
                >
                  {{ category.title }}</a
                >
              </button>
            </div>
          </div>
        </div>

        <!-- <h1 class="invited_by text-center py-5 bg-white rounded-2xl font-bold leading-10">
          {{ invitationMessage }}
        </h1> -->

        <!-- start sections -->
        <div
          v-for="(category, idx) in categories"
          :key="idx"
          class="container mx-auto first_section"
          :id="'section_' + idx"
        >
          <!-- title -->
          <div class="title">
            <h1 class="text-[30px] leading-[36px] font-[600]">{{ category.title }}</h1>
          </div>
          <!-- details cards -->
          <div class="details">
            <div v-for="(product, idx) in category.products" :key="idx" class="bg-white">
              <div class="cart w-[210px]">
                <RouterLink :to="'/product/' + product.slug">
                  <img
                    class="rounded-t-lg w-full object-cover"
                    :src="'https://cdn.s3.finpard.io/' + product.imageSrc"
                  />
                </RouterLink>
                <div
                  class="text break-all font-[400] text-[13px] leading-[16px] text-[#222222] mt-5"
                >
                  <h5 class="mb-2 price font-[700] text-[20px] leading-[22px]">
                    {{ formatPrice(product.price) }} {{ currency }}
                  </h5>
                  <h4 class="text-[18px] font-[500]">{{ product.title }}</h4>
                  <p class="mb-2 font-normal persent link flex gap-2">
                    <del class="mb-1 font-normal">{{ formatPrice(product.originalPrice) }}</del>
                    <span>{{ product.discount }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- more button -->
          <div class="container mx-auto flex justify-center mt-5">
            <RouterLink
              :to="'/category/' + category.slug"
              class="more flex items-center gap-3 justify-center"
            >
              <p>{{ category.moreButtonText }}</p>
              <img :src="more" :alt="category.moreButtonText" />
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="categories.length === 0" class="w-full h-[50vh] grid place-items-center">
        <a-empty>
          <template #description>
            <div class="text-[20px] font-bold text-gray-400">НЕТ ПРОДУКТОВ</div>
          </template>
        </a-empty>
      </div>
      <!-- start footer -->
      <div>
        <Footer />
        <FooterInfo />
      </div>

      <!-- finish footer -->
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FooterInfo from '@/components/FooterInfo.vue'

import Loader from '@/components/Loader.vue'
import axios from 'axios'
import images from './images.js'
import { ESTORE_URL } from '../stores/store.js'

export default {
  data() {
    return {
      slides: [
        { imageSrc: images.headerImg },
        { imageSrc: images.headerImg },
        { imageSrc: images.headerImg }
      ],
      activeSlideIndex: 0,
      invitationMessage: '',
      categories: [],
      more: images.more,
      product_img: images.ring,
      isLoading: false,
      companyTitle: '',
      companyPhone: '',
      companyLogo: '',
      companyEmail: '',
      companyAddress: '',
      category: [],
      currency: '',
      collapse: ''
    }
  },

  async mounted() {
    this.isLoading = true
    localStorage.setItem('showTag', false)
    try {
      this.isLoading = true
      const response = await axios.get(ESTORE_URL)
      const data = response.data
      if (data.length > 0) {
        const companyData = data[0]
        localStorage.setItem('companyData', JSON.stringify(companyData))
      }
      // console.log(data[0])
      if (data.length > 0) {
        this.companyTitle = data[0].company_title
        this.companyPhone = data[0].company_phone
        this.companyLogo = data[0].logo_square
        this.companyEmail = data[0].email
        this.companyAddress = data[0].address
        this.currency = data[0].currency
      }
      // console.log(data)
      this.categories = data
        .filter((item) => item.products && item.products.length > 0)
        .map((item) => ({
          title: item.title,
          slug: item.slug,
          category: item.categories,
          products: item.products.map((product) => ({
            slug: product.slug,
            imageSrc: product.image,
            title: product.title,
            price: product.price,
            originalPrice: '',
            discount: '',
            description: ''
          })),
          moreButtonText: 'Показать еще'
        }))
      // const slugCategory = this.categories.map((item) => item.slug)
      // localStorage.setItem('categorySlug', slugCategory)
      this.collapse = data
        .filter((item) => item.products)
        .map((item) => ({
          title: item.title,
          slug: item.slug,
          subcategories: item.subcategories.map((subcategory) => ({
            title: subcategory.title
          }))
        }))
      // console.log(this.collapse)
      this.isLoading = false
    } catch (error) {
      this.isLoading = true
      console.error(error)
    }
    this.updateCollapse()
    this.updateFavicon()
  },
  methods: {
    updateFavicon() {
      const companyDataString = localStorage.getItem('companyData')
      if (companyDataString) {
        const companyData = JSON.parse(companyDataString)
        let link = document.querySelector("link[rel*='icon']")
        if (!link) {
          link = document.createElement('link')
          link.type = 'image/x-icon'
          link.rel = 'shortcut icon'
          document.getElementsByTagName('head')[0].appendChild(link)
        }

        if (companyData && companyData.logo_square) {
          link.href = `https://cdn.s3.finpard.io/${companyData.logo_square}`
        }
        document.title = companyData.company_title
      }
    },
    updateCollapse() {
      this.$store.dispatch('updateCollapse', this.collapse)
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    scrollToSection(idx) {
      const sectionId = 'section_' + idx
      const sectionElement = document.getElementById(sectionId)

      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // saveProductSlug(slug) {
    //   localStorage.setItem('slug', slug)
    // },

    // saveCategorySlug(slug) {
    //   localStorage.setItem('currentCategorySlug', slug)
    // }
  },

  components: {
    Navbar,
    Footer,
    FooterInfo,
    RouterLink,
    Loader
  }
}
</script>

<style lang="scss">
.cart img {
  height: 210px;
}
.slide img {
  width: 100% !important;
  border-radius: 15px;
}
.first_section,
.second_section,
.third_section,
.fourth_section {
  .first_section,
  .second_section,
  .third_section,
  .fourth_section button {
    --swiffy-slider-nav-light: #000;
    --swiffy-slider-nav-zoom: 0.3;
  }
  .product_description {
    word-wrap: break-word;
  }
}

@media (width: 1280px) {
  .first_section,
  .second_section,
  .third_section,
  .fourth_section {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .home_page {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fourth_section {
    padding-top: 10px;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .header_img {
    object-fit: cover;
    height: 170px !important;
  }
}

@media (max-width: 640px) {
  .first_section,
  .second_section,
  .third_section,
  .fourth_section {
    width: 100%;

    padding-left: 20px;
    border-radius: 25px;
    height: auto;
    padding-bottom: 30px;
    background-color: white;
  }
}

.persent {
  del {
    color: #8c8c8c;
  }
  span {
    color: #cc2e19;
  }
}

.slider-nav::before {
  content: '';
  position: absolute !important;
  padding: 4.5rem !important;
  right: -40px !important;
}

.more {
  width: 213px;
  height: 45px;
  border-radius: 150px;
  border: 1px solid #07a461;

  img {
    width: 15px;
    height: 15px;
  }
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #05a160;
  }
}

.info {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.details {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  overflow-x: scroll;
  gap: 10px;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.hamburger {
  cursor: pointer;
}
</style>
