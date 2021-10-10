<template>
  <div class="app">
    <main>
      <!-- <SearchInput
        :searchKeyword="searchKeyword"
        @input="updateSearchKeyword"
      /> -->
      <SearchInput v-model="searchKeyword" @search="searchProducts" />
      <ul>
        <li
          v-for="product in products"
          :key="product.id"
          class="item flex"
          @click="moveToDetailPage(product.id)"
        >
          <img
            class="product-image"
            :src="product.imageUrl"
            :alt="product.name"
          />
          <p>{{ product.name }}</p>
          <span>${{ product.price }}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="routeToCart">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import { fetchProducts, fetchProductsByKeyword } from '~/api'

export default {
  components: {
    SearchInput,
  },
  async asyncData() {
    const { data } = await fetchProducts()
    const products = data.map((item) => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    }))
    return { products }
  },
  data() {
    return {
      searchKeyword: '',
    }
  },
  methods: {
    routeToCart() {
      this.$router.push('/cart')
    },
    moveToDetailPage(id) {
      this.$router.push(`detail/${id}`)
    },
    // updateSearchKeyword(keyword) {
    //   this.searchKeyword = keyword
    // },
    async searchProducts() {
      const { data } = await fetchProductsByKeyword(this.searchKeyword)
      this.products = data.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
    },
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
