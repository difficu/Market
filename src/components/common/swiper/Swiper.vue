<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <div v-for="(item , index) in slideCount" class="indi-item" :key="index" :class="{active:index == currentIndex-1}"></div>
    </div>
  </div>
</template>

<script>
  export default{
   name:'Swiper',
   data(){
     return {
       slideCount:0, //存在的图片个数
      //  currentIndex:0,
       totalWidth:0,
       swiperStyle:{},
       animDuration:500,
       currentIndex:1,
       scrolling:false,
       startX:0,
       currentX:0,
       distance:0,
       moveRatio:0.25//轮播图拉动的系数
     }
   },

    mounted(){
      setTimeout(()=>{
        this.handleDom()

        this.startTimer()
      },100)
    },

   methods:{
     startTimer(){
       this.player = setInterval(()=>{
         this.currentIndex ++
         this.scrollContent(-this.currentIndex * this.totalWidth)
       }, 2000)
     },

     handleDom(){
       let swiperEl = document.querySelector('.swiper')
       let slidesEls = document.getElementsByClassName('slide')

      this.slideCount = slidesEls.length

      this.totalWidth = slidesEls[0].offsetWidth

      // console.log(slidesEls)

      if(this.slideCount > 1){
        let cloneFirst  =slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount-1].cloneNode(true)

        swiperEl.insertBefore(cloneLast , slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        // console.log(this.totalWidth)

      }

      this.swiperStyle = swiperEl.style
      this.setTransform(-this.totalWidth)
     },

     scrollContent(currentPosition){
        this.scrolling = true

         this.swiperStyle.transition = 'all ' + this.animDuration + 'ms'
         this.setTransform(currentPosition)

         this.checkPosition()

         this.scrolling = false
     },

     setTransform(position){
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
     },


     checkPosition(){
       setTimeout(()=>{

         this.swiperStyle.transition ='0ms'
        if(this.currentIndex >= this.slideCount+1){
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        }else if(this.currentIndex <= 0){
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
       } , this.animDuration)
     },

     stopTimer(){
       window.clearInterval(this.player)
     },

     touchStart(e){
       if(this.scrolling) return

       this.stopTimer()

        this.startX = e.touches[0].pageX
     },

     touchMove(e){

       this.currentX = e.touches[0].pageX

       this.distance = this.currentX - this.startX

       let currentPosition = -this.currentIndex * this.totalWidth

       let moveDistance = currentPosition + this.distance

       this.setTransform(moveDistance)
      // console.log(e)

     },

     touchEnd(){
       let currentMove = Math.abs(this.distance)

       if(this.distance == 0){
         return
       }else if(this.distance < 0 && currentMove >= this.totalWidth * this.moveRatio){
         this.currentIndex++
       }else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){
         this.currentIndex--
       }

       this.scrollContent(-this.currentIndex * this.totalWidth)

       this.startTimer()
     }
   }

   
  }
</script>

<style scoped>
  #hy-swiper{
    overflow: hidden;
    position: relative;
  }

  .swiper{
    display: flex;
  }

  .indicator{
    display: flex;
    text-align: center;
    position: absolute;
    bottom: 8px;
    width: 100%;
    justify-content: center;
  }

  .indi-item{
    width:10px;
    height:10px;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0 5px;
    background-color: #fff;
  }

  .active{
    background-color: rgba(212,62,46,1.0);
  }
</style>