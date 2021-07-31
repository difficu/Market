 <template>
  <div class="wrapper" ref="scroll">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BSscroll from "better-scroll"

  export default{
   name:'Scroll',
   data(){
     return{
       scroll:null
     }
   },
   mounted(){
     this.scroll = new BSscroll(this.$refs.scroll , {
       probeType:3,
       click:true,
       pullUpLoad:true
     })

     this.scroll.on('scroll' , (position)=>{
       this.$emit('scroll' , position)
     })

     this.scroll.on('pullingUp' , ()=>{
       this.$emit('pullingUp');
     })

   },
   methods:{
     scrollTo(x , y , time=300){
       this.scroll && this.scroll.scrollTo(x , y , time)
     },
     finishPullUp(){
       this.scroll.finishPullUp()
     },
     refresh(){
      //  console.log('----')
       this.scroll && this.scroll.refresh()
     },
     getScroll(){
       return this.scroll ? this.scroll.y : 0
     }
   }
  }
</script>

<style scoped>
  .wrapper{
    overflow: hidden;
  }
</style>