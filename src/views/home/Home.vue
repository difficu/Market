 <template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>
   <tab-control :titles="['流行' , '新款' , '精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"
                    class="tabControl" v-show="isLoad">
      </tab-control>
   <scroll 
      class="content" 
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行' , '新款' , '精选']"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    :class="{fixed:isLoad}">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
   </scroll>

   <back-top @click.native="backClick" v-show="isShow"/>
   
 </div>



</template>

<script>
  import Scroll from "components/common/scroll/Scroll"
  import NavBar from "components/common/navbar/NavBar"

  import GoodsList from 'components/content/goods/GoodList'
  import BackTop from 'components/content/backtop/BackTop'

  import {getMultidata , getHomeGoods} from 'network/home.js'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from 'views/home/childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import TabControl from 'components/content/tabcontrol/TabControl'

  export default {
   name:'Home',
   components:{
     Scroll,
     NavBar,
     GoodsList,
     BackTop,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
   },
   data(){
     return {
       banners:[],
       recommends:[],
       goods:{
         'pop':{page:1 , list:[]},
         'new':{page:1 , list:[]},
         'sell':{page:1 , list:[]}
       },
       currentType:'pop',
       isShow:false,
       offsetTop:0,
       isImageLoad:false,
       isLoad:false,
       scrollTop:0
     }
   },
   computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   created(){
     this._getMultidata()

    //  getHomeGoods('pop' , 1).then()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

   },
   mounted(){
     const refresh = this.debounce(this.$refs.scroll.refresh , 200)

     this.$bus.$on('itemImageLoad' , ()=>{
      refresh()
      // this.debounce(this.$refs.scroll.refresh , 200)()
    })


    // 得到tabControl的高度
    // console.log(this.$refs.tabControl1)
   },
   activated(){

   },
   deactivated(){
    //  this.scrollTop = this.$refs.scroll.getScroll()
   },
   methods:{
      debounce(func , time){
        let timer = null

        return function(...args){
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this , ...args)
          } , time)
        }
      },

      backClick(){
        this.$refs.scroll.scrollTo(0 , 0)
      },
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentindex = index
        this.$refs.tabControl2.currentindex = index
      },
      contentScroll(position){

        // console.log(position)
        this.isShow = (-position.y) > 1000

        this.isLoad = (-position.y) > this.offsetTop
        // console.log(this.isLoad)
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },


      swiperImageLoad(){
        if(!this.isImageLoad){
          this.offsetTop = this.$refs.tabControl1.$el.offsetTop
          // console.log(this.$refs.tabControl1.$el.offsetTop)
          // console.log(this.offsetTop)
        }

        this.isImageLoad = true

      },




      _getMultidata(){
        getMultidata().then(res=>{
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
          // console.log(this.banners)
          // console.log(this.recommends)
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page

        getHomeGoods(type , page).then(res=>{
          // console.log(res.data.data.list)
          this.goods[type].list.push(...res.data.data.list)
          // console.log(this.goods[type].list)
          this.goods[type].page++

          this.$refs.scroll.finishPullUp()

        })


      }

   }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    width: 100%;
    background-color: pink;
    font-size: 20px;
    font-weight: 800;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed{
    position: fixed;
    top: 44px;
  }

  .tabControl{
    position: relative;
    top: 44px;
    z-index: 20;
    background-color: white;
    padding: 3px 0;
  }
  
</style>
