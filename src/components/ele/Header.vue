<template>
  <header>
    <span> <img class="logo" src="../../assets/images/minilogo.png" alt=""> Starscape OBS Manager  ({{version}})</span>
    <span>
        <img @click="min" src="../../assets/images/obs/small.png" alt="">
        <img @click="close" src="../../assets/images/obs/close.png" alt="">
    </span>
  </header>
</template>

<script lang="ts" >
import { ref } from "vue"

export default {
  setup(){
    let  version = ref("");
    window.getAppVersion().then(res=>{
     console.log(res);
     version.value = res
      
    })
    const min =()=>{
      window.AppWindowMin()
    }

    const close =()=>{
      window.AppWindowClose()
    }
    return {
      min,
      close,
      version
    }
  }
}
</script>

<style lang="scss" scoped>
 header{
   background: #3A3548;
   height: 32px;
   line-height: 32px;
   -webkit-app-region:drag;
   cursor:pointer;
   justify-content: space-between;
   display: flex;
   padding: 0 8px 0 14px;
   font-size: 12px;
   img{
     width: 16px;
     height: 16px;
     margin-top: 8px;
     margin-left: 8px;
     cursor: pointer;
     -webkit-app-region:no-drag;
   }
   .logo{
     height: 20px;
     width: 20px;
     float: left;
     margin-top:6px;
      margin-left: 0px;
   }
 }

</style>