<template>
  <div class="obs-buttons" @click.stop="openInstall">
    <div v-if="isInstalling" class="button-loading">
      <Loading />
    </div>
    <button
      v-else
      :class="
        isInstalled ? (installStatus ? 'Uninstall' : 'installed') : 'install'
      "
    >
      {{
        isInstalled ? (installStatus ? "Uninstall" : "Installed") : "Install"
      }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import Loading from "./pluginLoading.vue";
import { myPlugins } from "@/scripts/util";
import { version } from "os";
import { openMsgbox } from "@/components/message";
import { obsCheckRunning, RemoveObs } from "@/scripts/obsutils";

import { useRoute } from 'vue-router'
import axios from 'axios'
import { loadSrcipt } from "@/scripts/untils";
//STARSCAPE-OBS://ele-detail?id=13123
export default defineComponent({
  components: {
    Loading,
  },
  props: {
    info: {
      type: Object,
      default: "",
    },
    installStatus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    console.log(props);
    console.log("props");
    const $route = useRoute()
    const { installStatus } = props;
    const { info } = toRefs(props) as any;
    console.log(props);
    console.log($route.meta.path);
    
    const isInstalled = computed(() => {
      return myPlugins.value.some((item) => item.id == info.value.id);
    });

    const isInstalling = computed(() => {
      return myPlugins.value.some((item) => {
        return item.id == info.value.id && item.installing;
      });
    });
    window.handleResponse = function (res){
      console.log("callback回调");
      console.log(res);
      if(!res){
        const a = document.createElement("a");
        a.setAttribute("download","");
        a.setAttribute("href",localStorage.getItem("downloadLink"))
        a.click()
      }
    }
    const openInstall = () => {
      console.log(isInstalled.value );
      // console.log(isInstalling.value );

      if (isInstalling.value ) return;
      //这里判断是都是官网的下载按钮 打开obs管家详情
      if (location.href.indexOf("plugin-list")>-1||location.href.indexOf("plugin-detail")>-1||$route.meta.path==="plugin-list") {
       window.open(`STARSCAPE-OBS://ele-detail?id=${info.value.id}&router=ele-list&form=web`);

       let status:any = ""
       setTimeout(()=>{
        console.log(status);
        loadSrcipt("http://localhost:34306/heartbeat?callback=handleResponse",(res)=>{
          console.log("js加载回调");
          console.log(res);
          
          if(!res){
            const a = document.createElement("a");
            a.setAttribute("download","");
            a.setAttribute("href",localStorage.getItem("downloadLink"))
            a.click()
          }
        })
       
        
      },6000)
      
      //   protocolCheck(
      //   `STARSCAPE-OBS://ele-detail?id=${info.value.id}&router=ele-list&form=web`,
      //   () => {
      //     console.log("Custom protocol not found.");
      //   },
      //   () => {
      //     console.log("Custom protocol found and opened the file successfully.") ;
      //   }, 5000
      // );
        return
      }
      
      if (location.href.indexOf("/ele-list")>-1&&isInstalled.value) {
        return false
      }
      if (isInstalled.value) {
        console.log("woshi xiezai");
       window.mixpanel.track('Click Uninstall plugin',{
            "pluginId":info.value.id,
            "pluginName":info.value.name
          });
        RemoveObs(info.value).then((res) => {
          let mylist = [...myPlugins.value];
          console.log("info.value.id");
          console.log(info.value.id);
          window.mixpanel.track('Uninstall plugin',{
            "pluginId":info.value.id,
            "pluginName":info.value.name
          });

          myPlugins.value = mylist.filter((item) => {
            return item.id !== info.value.id;
          });
        });
        return;
      }

    
      let aa = {
        id: info.value.id,
        installing: true,
      };

      myPlugins.value.push(aa);
      window.mixpanel.track('Click Install plugin',{
              "pluginId":info.value.id,
              "pluginName":info.value.name
            });
      // // 打开安装弹窗
     
      obsCheckRunning()
        .then((res) => {
          if (!res) {
            console.log(info.value);
            let params = {
              id: info.value.id,
              version: info.value.version,
              downloadLink: info.value.downloadLinks,
            };
            console.log(params);
           
            window.obsPluginInstall(JSON.stringify(params)).then((res) => {
              console.log("列表obsPluginInstall");
              console.log(res);
               
              if (res.code == 0) {
                window.mixpanel.track('Install plugin',{
                  "pluginId":info.value.id,
                  "pluginName":info.value.name
                });
                window.obsPluginGet().then((res) => {
                  console.log(res);
                  console.log("myPlugins");
                  console.log(myPlugins.value);
                  let mylist = [...myPlugins.value]
                      mylist = mylist.filter(item=>{
                         return item.id !== info.value.id;
                      })
                      //获取之后要把正在下载插件的loading状态 加上  
                  if (res.code === 0) {
                    myPlugins.value = res.data.concat(mylist);
                  }
                  console.log("obsPluginGet");
                });
              } else {
                if(res.code==1001){
                   let mylist = [...myPlugins.value];
                        console.log("info.value.id");
                        console.log(info.value.id);
                        myPlugins.value = mylist.filter((item) => {
                          return item.id !== info.value.id;
                        });
                  //  openMsgbox({
                  //   title: "xxx",
                  //   msg: "OBS is not installedin your computer",
                  //   yes: "Install OBS",
                  //   yesFn: () => {
                  //     console.log("queding");
                  //      let mylist = [...myPlugins.value];
                  //       myPlugins.value = mylist.filter((item) => {
                  //         return item.id !== info.value.id;
                  //       });
                  //     window.open("https://obsproject.com/download")
                  //   },
                  //   cancelFn: () => {
                  //      let mylist = [...myPlugins.value];
                  //      myPlugins.value = mylist.filter((item) => {
                  //      return item.id !== info.value.id;
                  //   });
                  //   },
                  // });
                }else{
                   openMsgbox({
                      title: "xxx",
                      msg: res.message,
                      yes: "Got It",
                      yesFn: () => {
                        console.log("queding");
                        let mylist = [...myPlugins.value];
                        console.log("info.value.id");
                        console.log(info.value.id);
                        myPlugins.value = mylist.filter((item) => {
                          return item.id !== info.value.id;
                        });
                      },
                      cancelFn: () => {
                        let mylist = [...myPlugins.value];
                        console.log("info.value.id");
                        console.log(info.value.id);

                        myPlugins.value = mylist.filter((item) => {
                          return item.id !== info.value.id;
                        });
                      },
                    });
                }
               
              }
            });
          }
        })
        .catch((res) => {
          console.log(res);
          
          let list = myPlugins.value;
          myPlugins.value = list.filter((item) => {
            return item.id !== info.value.id;
          });
        });
    };

    return {
      isInstalled,
      isInstalling,
      openInstall,
      installStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.obs-buttons {
  flex-shrink: 0;
  @include flex;
  button,
  .button-loading {
    @include flex;
    width: 78px;
    height: 32px;
    box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
    border-radius: 4px;
    line-height: 32px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    + button {
      margin-left: 6px;
    }
  }
  .button-loading {
    background-color: #683eff;
  }
  .install {
    background-color: #683eff;
    color: #fff;
    &:hover {
      background: #3d1bb6;
    }
  }
  .installed {
    color: #fff;
    border: 1px solid #ffffff;
    @include obsInfosIcon("correct");
  }
  .Uninstall {
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #ff6b55;
    border: 1px solid #ff6b55;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
    border-radius: 4px;
    &:hover {
      background: #ff6b55;
      color: #fff;
    }
  }
}
</style>
