 <template>
  <div id="app">
  <keep-alive exclude="Detail">
    <router-view></router-view>
  </keep-alive>
  <main-tabbar></main-tabbar>
  </div>
</template>

<script>
  import MainTabbar from "components/content/maintabbar/MainTabbar"
  // import MainTabbar from "./components/common/maintabbar/MainTabbar.vue"

  export default{
   name:'app',
   components:{
     MainTabbar
   }
  }
</script>

<style scoped>
  @import "assets/css/base.css";
  #app{
    height: 100%;
  }
</style>