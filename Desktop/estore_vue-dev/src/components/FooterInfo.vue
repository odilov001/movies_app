<template lang="">
  <div class="footer_info w-full">
    <div class="w-full pt-10 container mx-auto flex flex-col gap-7">
      <div class="connect_us flex items-center justify-center gap-10">
        <a
          target="_blank"
          :href="
            'https://yandex.com/maps/?ll=10.854186%2C49.182076&z=4&text=' +
            encodeURIComponent(address)
          "
          class="flex items-center gap-2"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.539 15.341L7.542 15.344L7.544 15.346C7.67522 15.4454 7.83535 15.4993 8 15.4993C8.16465 15.4993 8.32478 15.4454 8.456 15.346L8.458 15.344L8.461 15.341L8.473 15.332C8.53744 15.2824 8.60079 15.2314 8.663 15.179C9.40862 14.5505 10.0936 13.8535 10.709 13.097C11.81 11.735 13 9.755 13 7.5C13 6.17392 12.4732 4.90215 11.5355 3.96447C10.5979 3.02678 9.32608 2.5 8 2.5C6.67392 2.5 5.40215 3.02678 4.46447 3.96447C3.52678 4.90215 3 6.17392 3 7.5C3 9.755 4.19 11.735 5.292 13.097C5.90739 13.8535 6.59239 14.5505 7.338 15.179C7.4003 15.2309 7.46331 15.2819 7.527 15.332L7.539 15.342V15.341ZM8 9C8.19698 9 8.39204 8.9612 8.57403 8.88582C8.75601 8.81044 8.92137 8.69995 9.06066 8.56066C9.19995 8.42137 9.31044 8.25601 9.38582 8.07403C9.4612 7.89204 9.5 7.69698 9.5 7.5C9.5 7.30302 9.4612 7.10796 9.38582 6.92597C9.31044 6.74399 9.19995 6.57863 9.06066 6.43934C8.92137 6.30005 8.75601 6.18956 8.57403 6.11418C8.39204 6.0388 8.19698 6 8 6C7.60218 6 7.22064 6.15804 6.93934 6.43934C6.65804 6.72064 6.5 7.10218 6.5 7.5C6.5 7.89782 6.65804 8.27936 6.93934 8.56066C7.22064 8.84196 7.60218 9 8 9Z"
              fill="#A9A9B3"
            />
          </svg>
          {{ address }}
        </a>
        <a :href="'tel:' + phoneNumber" class="flex items-center gap-2"
          ><svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.855 7.786L4.922 7.252C5.11143 7.15747 5.26598 7.00526 5.36338 6.81729C5.46078 6.62931 5.49601 6.41528 5.464 6.206L5.024 3.348C4.9877 3.11197 4.86813 2.89671 4.68692 2.74118C4.5057 2.58564 4.27481 2.50009 4.036 2.5H3C2.73478 2.5 2.48043 2.60536 2.29289 2.79289C2.10536 2.98043 2 3.23478 2 3.5V5.5C2 6.209 2.082 6.9 2.238 7.562C2.62256 9.19074 3.45304 10.6802 4.6364 11.8636C5.81976 13.047 7.30926 13.8774 8.938 14.262C9.61389 14.4204 10.3058 14.5002 11 14.5H13C13.2652 14.5 13.5196 14.3946 13.7071 14.2071C13.8946 14.0196 14 13.7652 14 13.5V12.464C13.9999 12.2252 13.9144 11.9943 13.7588 11.8131C13.6033 11.6319 13.388 11.5123 13.152 11.476L10.294 11.036C10.0847 11.004 9.87069 11.0392 9.68271 11.1366C9.49474 11.234 9.34253 11.3886 9.248 11.578L8.714 12.645C7.57609 12.2796 6.54166 11.6482 5.69647 10.8032C4.85128 9.95814 4.22067 8.92384 3.855 7.786Z"
              fill="#A9A9B3"
            />
          </svg>
          {{ formattedPhoneNumber(phoneNumber) }}
        </a>
        <a :href="'mailto:' + email" class="flex items-center gap-2">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 3.5C2.10218 3.5 1.72064 3.65804 1.43934 3.93934C1.15804 4.22064 1 4.60218 1 5V5.793C1.026 5.802 1.051 5.813 1.076 5.825L7.674 9.01C7.88 9.11 8.12 9.11 8.326 9.01L14.924 5.825C14.9487 5.81296 14.9741 5.80227 15 5.793V5C15 4.60218 14.842 4.22064 14.5607 3.93934C14.2794 3.65804 13.8978 3.5 13.5 3.5H2.5Z"
              fill="#A9A9B3"
            />
            <path
              d="M15 7.4541L8.978 10.3601C8.67299 10.5073 8.33868 10.5838 8 10.5838C7.66132 10.5838 7.32701 10.5073 7.022 10.3601L1 7.4541V12.0001C1 12.3979 1.15804 12.7795 1.43934 13.0608C1.72064 13.3421 2.10218 13.5001 2.5 13.5001H13.5C13.8978 13.5001 14.2794 13.3421 14.5607 13.0608C14.842 12.7795 15 12.3979 15 12.0001V7.4541Z"
              fill="#A9A9B3"
            />
          </svg>
          {{ email }}
        </a>
      </div>
      <div class="flex items-center w-full justify-between info_footer">
        <div class="flex items-center gap-4 all_info">
          <a target="_blank" href="/agreement">Общая правовая информация </a>
          <a target="_blank" href="/privacy">Политика конфиденциальности</a>
          <a target="_blank" href="/oferta">Публичная оферта </a>
        </div>
        <div>
          <p>website powered by <a href="https://finpard.io">finpard.io</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phoneNumber: '',
      email: '',
      address: ''
    }
  },
  created() {
    const companyDataString = localStorage.getItem('companyData')

    if (companyDataString !== null) {
      const companyData = JSON.parse(companyDataString)
      this.phoneNumber = companyData.company_phone
      this.address = companyData.address
      this.email = companyData.email
      // console.log(companyData.address)
    } else {
      console.log('No company data found in localStorage')
    }
  },
  methods: {
    formattedPhoneNumber(phoneNumber) {
      if (typeof phoneNumber === 'string') {
        phoneNumber = phoneNumber.replace(/[^\d]/g, '')
        const match = phoneNumber.match(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/)
        if (match) {
          return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
        }
      }
      return phoneNumber
    }
  }
}
</script>
<style lang="scss">
.footer_info {
  margin-top: 146px;
  min-height: 181px;
  background-color: #f2f2f7;
  .connect_us a {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: #222222;
  }
  .info_footer a,
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: #9e9ea9;
  }
  a:hover {
    color: #07a461;
  }
  @media (width: 1280px) {
    padding: 0 20px;
  }
}

@media (max-width: 1024px) {
  .footer_info {
    padding-bottom: 20px;
    margin-top: 40px;
    .connect_us {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    .info_footer {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    .all_info {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
}
@media (max-width: 768px) {
  .footer_info {
    padding-bottom: 100px;
    margin-top: 20px;
  }
}
</style>
