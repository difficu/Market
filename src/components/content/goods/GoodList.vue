 <template>
  <div class="goods">
    <!-- <div v-for="item in goods"> -->
      <goods-list-item :goodsItem="item" 
                        v-for="item in goods" class="item">
      </goods-list-item>
    <!-- </div> -->
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default{
   name:'GoodsList',
   components:{
     GoodsListItem
   },
   props:{
     goods:{
       type:Array,
       data(){
         return []
       }
     }
   }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    /* flex-direction: row; */
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods .item{
    width: 48%;
  }


</style>