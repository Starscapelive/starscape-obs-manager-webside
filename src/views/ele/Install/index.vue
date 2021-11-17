<template>
  <div  >
    <div v-show="loading" class="obs-loading">
        <Loading />
      </div>
    <div v-show="data.mock.length > 0 &&!loading" class="list">
      <p>{{data.mock.length}} Installed plugins</p>
      <template v-for="item in data.mock" :key="item.id">
        <cardVue @uplist="getMyPlugin" :item="item"></cardVue>
      </template>
    </div>
    <div v-if="!loading&&data.mock.length ===0"  class="browse">
      <p>You haven’t installed any plugins</p>
      <div class="router-link">
        <router-link to="/ele-list"> Browse </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import listVue from '@/views/pluginList/list.vue'
import cardVue from "./card.vue";
import { defineComponent, reactive, ref } from "vue";
import Loading from '../../pluginDetail/pluginLoading.vue'
import { post } from "@/scripts/axios";
import  {myPlugins}  from '@/scripts/util'
import iconDefault from '@/assets/images/icon-default.png'
export default defineComponent({
  components: {
    cardVue,
    Loading
  },
  setup() {
    console.log("111");
    const loading = ref(true)
     window.mixpanel.track('My plugin page Visit');

    const data: any = reactive({
      list: [],
      mock: JSON.parse(localStorage.getItem("installPluginList"))||[],
    });
    if(data.mock.length>0){
       loading.value = false ;
    }
    console.log("data");
    const getMyPlugin =(id?:string)=>{
      window.obsPluginGet().then((res) => {
      console.log(res);
      console.log("obsPluginGet");
      loading.value = false ;
       
     
      
      let list = res.data.map(item=>({
        ...item,
          icon: item.icon || iconDefault,
          version:item.version
          //  needUpdate : true
      }))
      
      
      if(id){
        
        let  mylist = [...myPlugins.value]
        mylist =  mylist.filter((item) => {
            return item.id !== id;
          });
          console.log("mylist");
          console.log(mylist);
          console.log(id);
          
        mylist.forEach(item=>{
          list.forEach(element => {
            if(item.id===element.id){
              element.loading = item.loading
            }
          });
        })  
      }
      console.log(list);
      
      myPlugins.value = list
      data.mock = list ;
      localStorage.setItem("installPluginList",JSON.stringify(data.mock))
     
    });
    }
    getMyPlugin()
    return {
      data,
      getMyPlugin,
      loading
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  
  width: 100%;
  overflow-y: auto;
  padding: 24px 32px;
  height: 100%;
  >p{
    height: 38px;
    font-size: 32px;
    width: 100%;;
    text-align: left;
    margin-bottom: 24px;
    font-weight: bolder;
  }
   .filter-wrap {
    @include flex(space-between);
    width: 100%;
    padding:0px;
    font-size: 14px;
    margin-bottom: 16px;
    .obs-input {
      /* flex-grow: 1; */
      @include obsSelectIcon('search');
      width: 418px;
      float: left;
    }
    .obs-select {
      margin-left: 8px;
      &__platform {
        @include obsSelectIcon('filter');

      }
      &__sort {
        @include obsSelectIcon('sort');
      }
    }
    .Update{
        cursor: pointer;
        background: #FFFFFF;
        box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        color: #683EFF;
        width:85px;
        text-align: center;
        padding-left: 0;
        display: block;
        height: 40px;
        line-height: 40px;
        float: right;
      }
  }
 .card-wrap{
   margin-bottom: 8px;
 }
  /* &:after {
       content: "";
       width: 214px;
        height: 234px;
      visibility: hidden;
      display: inline-block;
        } */
  /* div {
    width: 214px;
    height: 234px;
    margin-right: 16px;
    margin-bottom: 16px;
    &:nth-child(4n) {
      margin-right: 0px;
    }
  } */
}
.browse {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  padding-top: 292px;
  align-items: center;
  color: #9a95aa;
  text-align: center;
  width: 100%;
  .router-link {
    margin: 24px auto 0;
    height: 41px;
    width: 87px;
  }
  a {
    background: #683eff;
    border-radius: 4px;
    height: 41px;
    width: 87px;
    display: block;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffffff;
    line-height: 41px;
  }
}
.obs-loading{
  margin: 0 auto;
  width: 20px;
  margin-top: 324px;
}
 
</style>
