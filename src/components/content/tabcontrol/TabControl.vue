<template>
  <div class="tabcontrol">
    <div>
      <span v-for="(item , index) in titles" @click="itemClick(index)" :class="{active:currentindex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default{
   name:'TabControl',
   data(){
     return {
       currentindex:0
     }
   },
   props:{
     titles:{
       type:Array,
       default(){
         return []
       }
     }
   },
   methods:{
     itemClick(index){
       this.currentindex = index
       this.$emit('tabClick', index);
     }
   }
  }
</script>

<style scoped>
  .tabcontrol div{
    display: flex;
    justify-content: space-evenly;
  }

  .active{
    padding-bottom: 5px;
    border-bottom: 2px solid pink;
    color: pink;
  }
</style>