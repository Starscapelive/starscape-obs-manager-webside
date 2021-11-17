<template>
<Header/>
    <main>
      
       <Aside />
      <router-view class="router-view" />
    </main>
   
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { openMsgbox } from '../message'
import Aside from './Aside.vue'
import Header from './Header.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Aside,
    Header
  },
  setup() {
    console.log('layout setup')
    window.obsMessage("obsSystemErrorMsg",(res)=>{
      console.log("obsSystemErrorMsg");
      console.log(res);
      if(res.code===1001){
        openMsgbox({
                  title: "xxx",
                  msg: "OBS is not installedin your computer",
                  yes: "Install OBS",
                  yesFn: () => {
                    console.log("queding");
                    window.open("https://obsproject.com/download")
                  },
                  cancelFn: () => {
                    
                  },
                });
      }
      
      
    })
  },
})
</script>

<style lang="scss" scoped>

main {
  
  width: 100%;
  background:grb(34,31,43);
  height: 668px !important;
  border-radius: 16px;
  justify-content: space-between;
  display: flex;
  .router-view{
    width: 100%;
   
    
  }

}
</style>
<style>
#app{
  padding-top: 0px;
}

</style>