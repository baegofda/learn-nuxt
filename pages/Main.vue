<template>
  <div>{{ products }}</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const { data } = await axios.get('http://localhost:3000/products')
    this.products = data
  },
}
</script>

<style></style>
