 <template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommends-item">
      <img :src="item.image" alt="">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
  export default{
   name:'RecommendView',
   props:{
     recommends:{
       type:Array,
       default(){
         return []
       }
     }
   }
  }
</script>

<style scoped>
  .recommend{
    margin-top: 10px;
    display: flex;
    flex: 1;
    justify-content: space-around;
    font-size: 10px;

    padding-bottom: 50px;
    border-bottom: 10px solid #eee;
  }
  .recommends-item{
    width: 80px;
    height: 80px;
    text-align: center;
  }

  /* .recommends-item span{
    margin-top: 22px;
  } */

  .recommends-item img{
    width: 100%;
    height: 100%;
    margin-bottom: 8px;
  }
</style>