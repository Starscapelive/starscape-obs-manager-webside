<template>
  <div class="home-wrap">
    <div class="banner">
      <div class="info">
        <div class="title">OBS Manager</div>
        <div @click="getStatus" class="description">A fast & easy way to manage your OBS plugins</div>
      </div>
      <a class="download" :href="link" download="filename">
        <img src="@/assets/images/icon-windows.png" />Download for Windows
      </a>
    </div>
    <div class="container">
      <div class="menu-wrap">
        <div class="menu-item">
          <div class="icon">
            <img src="@/assets/images/icon-kind.png" />
          </div>
          All Plugins
        </div>
      </div>
      <List
        ref="pluginList"
        class="plugin-list"
        @card-click="toPluginDetail"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import List from './list.vue'
import { PluginItem } from '@/scripts/interface'
import { get } from '@/scripts/axios'

export default defineComponent({
  components: {
    List,
  },
  setup() {
    const $router = useRouter()
    const pluginList = ref(null)
   console.log("222");
   let link = ref("")
   get("/obs/getOBSManagerConfig").then((res:any)=>{
      console.log(res);
      link.value = res.data.downloadLink ;
      localStorage.setItem("downloadLink",res.data.downloadLink)
    }) 
    const toPluginDetail = ({ id, isInstalled }: PluginItem) => {
    
      
      if (!id) return
       window.open(`${location.origin}/plugins/plugin-detail?id=${id}`)
    }
    const getStatus = ()=>{
      
    }
    
    return {
      pluginList,
      toPluginDetail,
      link,
      getStatus
    }
  },
})
</script>

<style lang="scss" scoped>
.home-wrap {
  @include flex(flex-start, center, column);
  height: 100%;
  .banner {
    flex-shrink: 0;
    @include flex(space-between, flex-start);
    @include container;
    margin-top: 10px;
    height: 110px;
    padding: 12px 20px;
    background-image: url(@/assets/images/banner.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    .info {
      flex-grow: 1;
      overflow: hidden;
      @include flex(space-between, flex-start, column);
      font-family: 'regular';
      font-style: normal;
      .title {
        -webkit-font-smoothing: auto;
        font-weight: bold;
        font-size: 36px;
        line-height: 49px;
        color: #FFFFFF;
      }
      .description {
        width: 100%;
        font-weight: normal;
        font-size: 20px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.45);
        text-align: left;
        @include ellipsis;
      }
    }
    .download {
      flex-shrink: 0;
      @include flex;
      margin: 12px 0 0 20px;
      padding: 8px 30px;
      background: #683EFF;
      box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
      border-radius: 8px;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #FFFFFF;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background-color: #3D1BB6;
      }
      img {
        width: 20px;
        height: auto;
        margin-right: 4px;
      }
    }
  }
  .container {
    flex-grow: 1;
    @include flex(space-between, flex-start);
    @include container;
    margin: 12px auto 0;
    overflow: hidden;
    .menu-wrap {
      flex-shrink: 0;
      width: 202px;
      height: calc(100% - 22px);
      padding: 15px 16px;
      background: #282530;
      border-radius: 20px;
      .menu-item {
        @include flex(flex-start);
        padding: 7px 16px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        background: #683EFF;
        box-shadow: 0px 2px 5px rgba(56, 38, 121, 0.2);
        border-radius: 10px;
        .icon {
          width: 18px;
          height: 18px;
          margin-right: 16px;
          border-radius: 4px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .plugin-list {
      flex-grow: 1;
      margin-left: 44px;
    }
  }
}
</style>
