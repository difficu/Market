 <template>
  <div class="nav-bar">
    <div><slot name="left"></slot></div>
    <div><slot name="center"></slot></div>
    <div><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default{
   name:'NavBar'
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(red, green, blue, alpha);
    justify-content: space-around;
  }
</style>