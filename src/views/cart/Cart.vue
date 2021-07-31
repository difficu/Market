<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车</div></nav-bar>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartBottomBar from "./childComps/CartBottomBar.vue"

  export default {
    name:"Cart",
    components:{
      NavBar,
      CartBottomBar
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
