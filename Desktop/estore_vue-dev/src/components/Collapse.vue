<template lang="html">
  <div class="collapse nav-menu">
    <h1 class="font-bold tracking-[2px]">Категории</h1>
    <div v-for="(section, index) in collapseData" :key="index">
      <!-- @click="toggleCollapse(index)" -->
      <RouterLink
        :to="'/category/' + section.slug"
        class="nav-item flex items-center justify-between"
      >
        <p class="nav-link category text-[18px]">{{ section.title }}</p>
        <span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.22007 5.21995C8.3607 5.0795 8.55132 5.00061 8.75007 5.00061C8.94882 5.00061 9.13945 5.0795 9.28007 5.21995L13.5301 9.46995C13.6705 9.61058 13.7494 9.8012 13.7494 9.99995C13.7494 10.1987 13.6705 10.3893 13.5301 10.53L9.28007 14.78C9.1379 14.9124 8.94985 14.9846 8.75555 14.9811C8.56125 14.9777 8.37586 14.899 8.23845 14.7616C8.10104 14.6242 8.02233 14.4388 8.0189 14.2445C8.01547 14.0502 8.08759 13.8621 8.22007 13.72L11.9401 9.99995L8.22007 6.27995C8.07962 6.13933 8.00073 5.9487 8.00073 5.74995C8.00073 5.5512 8.07962 5.36058 8.22007 5.21995Z"
              fill="#AFAFAF"
            />
          </svg>
        </span>
      </RouterLink>
      <div v-for="(section, index) in sections" :key="index">
        <div v-if="section.showSubcategories" class="collapse_items flex flex-col">
          <RouterLink :to="'/category/' + section.slug" class="collapse_item">
            {{ section.title }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      collapse: [],
      subcategories: []
    }
  },
  watch: {
    $route(to, from) {
      if (from.path.startsWith('/category') && to.path.startsWith('/category')) {
        location.reload()
      }
    }
  },
  methods: {
    // toggleCollapse(index) {
    //   this.collapse[index].showSubcategories = !this.collapse[index]?.showSubcategories
    // }
  },
  computed: {
    collapseData() {
      return this.$store.state.collapse
    }
  }
}
</script>

<style lang="scss">
.collapse {
  visibility: visible;
  box-shadow:
    rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.nav-menu {
  position: absolute;
  left: -100%;

  z-index: 10;
  gap: 0;
  background-color: white;
  width: 100%;
  transition: 1s;
  height: 200px;
}
.collapse_items {
  height: auto;
  width: 100%;
}
.collapse {
  width: 50%;
  height: auto;
  border-bottom-right-radius: 20px;
}
.hamburger {
  cursor: pointer;
}

.bar {
  display: block;
  width: 15px;
  height: 2px;
  margin: 3px auto;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s ease-in-out;
  background-color: white;
}

.collapse a {
  color: #222222;
}
.collapse a:hover {
  color: #07a461;
}
.collapse .nav-menu {
  top: 0;
}
@media (max-width: 890px) {
  .nav-menu.active {
    bottom: 0;
  }
  .nav-menu {
    top: 0;
  }
  .collapse {
    width: 100%;
    height: 100vh;
  }
  .bar {
    width: 10px;
    height: 1px;
  }
}

.collapse a {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.nav-item {
  margin: 16px 0;
  cursor: pointer;
}
.nav-item:hover {
  color: #07a461;
}
.nav-item:hover path {
  stroke: #07a461;
}
.all_categories:focus,
.nav-item:focus path {
  stroke: #07a461;
}

.nav-menu.active {
  left: 0;
  padding: 0 45px;
  top: 60px;
}
.collapse_item.active {
  top: 0;
}

.collapse a:focus {
  color: #07a461;
}
.all_categories a:focus {
  color: #07a461;
}

.collapse_item {
  height: 45px;
  padding: 12px 15px 12px 32px;
}

@media (max-width: 768px) {
  .nav-menu.active {
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 100;
  }
}
</style>
