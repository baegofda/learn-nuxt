<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createCartItem, fetchProductById } from '@/api'

export default {
  async asyncData({ params }) {
    const { data: product } = await fetchProductById(params.id)
    return { product }
  },
  head() {
    return {
      title: `쇼핑 아이템 - ${this.product.name}`,
      meta: [
        // 추가하고싶다면 hid를 다르게 ! 덮어씌우기라면 hid를 동일하게
        {
          hid: 'description',
          name: 'description',
          content: `이상품은 ${this.product.name} 입니다.`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `이상품은 ${this.product.name} 입니다.`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `이상품은 ${this.product.name} 입니다.`,
        },
      ],
    }
  },
  methods: {
    async addToCart() {
      const r = await createCartItem(this.product)
      this.$store.commit('addCartItem', this.product)
      this.$router.push('/cart')
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
