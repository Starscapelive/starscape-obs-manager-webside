<template>
  <div class="list">
    <p class="back">
      <img
        @click="back"
        src="../../../assets/images/obs/return.png"
        alt=""
        srcset=""
      />
      My plugins
    </p>
    <div class="detail-wrap">
      <div v-if="item" class="detail-top">
        <div class="left">
          <div v-if="item.icon" class="icon">
            <img :src="item.icon" />
          </div>
          <div class="info">
            <div class="name">
              <span>{{ item.name }}</span>
              <span>{{ item.version }}</span>
            </div>
            <div class="description">{{ item.resume }}</div>
            <div class="bottom">
              <plugin-data :item="item" />
              <plugin-tags :tags="item.tags" style="margin-left: 16px" />
            </div>
          </div>
        </div>
        <div class="right">
           <div @click.stop="false" v-show="item.loading&&item.needUpdate" class="button-loading">
            <Loading />
          </div>
          <button
            v-show="item.needUpdate&&!item.loading"
            @click.stop="Update(item)"
            class="install"
            :class="item.needUpdate ? 'Update' : ''"
          >
            <img src="../../../assets/images/obs/right.png" alt="" srcset="" />
            {{ item.needUpdate ? "Update" : "Installed" }}
          </button>
          <Install
            v-show="!item.needUpdate"
            @uninstall="deleteItem"
            :installStatus="installStatus"
            :info="item"
          />
        </div>
      </div>
      <div class="detail-code" v-html="code"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import pluginData from "../../pluginDetail/pluginData.vue";
import pluginTags from "../../pluginDetail/pluginTags.vue";
import { pluginDetail, detailCode } from "@/scripts/mock";
import { get, post } from "@/scripts/axios";
import Install from "../../pluginDetail/pluginInstall.vue";
import { UpdateObs } from "@/scripts/obsutils";
import { myPlugins } from "@/scripts/util";
import Loading from "../../pluginDetail/pluginLoading.vue";
export default defineComponent({
  components: {
    pluginData,
    pluginTags,
    Install,
    Loading
  },
  setup() {
    console.log("9090");
    window.mixpanel.track('plugin description page visit');
    let installStatus = true;
    const item = ref(null);
    const code = ref("");
    // let  a  = 1
    const getDetail = () => {
      post("/obs/getPluginDetails", {
        id,
      }).then((result: any) => {
        console.log(result);

        if (!result || !result.data) return;
        let myDetail: any = {};
        window.obsPluginGet().then((res) => {
          console.log(res);
          myPlugins.value = res.data;
          res.data.forEach((element) => {
            if (id == element.id) {
              myDetail = element;
            }
          });
          const { description, tags } = result.data;
          console.log(myDetail);
          
          item.value = {
            ...result.data,
            needUpdate: myDetail.needUpdate,
            tags: tags || [],
          };
          code.value = description.replace(
            new RegExp(" href=", "gm"),' target="blank" href=');
        });
        // myPlugins.value  = res.data
        
      });
    };
    const Update = (info) => {
      if (!info.needUpdate || item.loading) {
        return;
      }
      item.value.loading = true ; 
       window.mixpanel.track('Click Update plugin',{
         "pluginId":info.id,
         "pluginName":info.name
       });
      UpdateObs(info).then((res) => {
        window.mixpanel.track('Update Plugin',{
         "pluginId":info.id,
         "pluginName":info.name
       });
        getDetail();
        console.log("33333");
      }).catch(res=>{
        item.value.loading = false ; 
      });
    };

    console.log("111");

    const $route = useRoute();
    const $router = useRouter();

    const { id } = $route.query;
    item.value = null;
    code.value = "";
   
    getDetail();

    const back = () => {
      console.log("111");
     
      if(location.href.indexOf("form=web")>-1){
         $router.push(`/ele-list`)
      }else{
         $router.go(-1);
      }
     
    };

    // get('/v1/login/check_login', {
    //   gameBoxLoginId: false
    // }).then(res => {
    //   console.log(res)
    // })

    // const code = detailCode.replace(new RegExp('<a href=', 'gm'), '<a target="blank" href=')

    const openInstall = () => {};

    return {
      item,
      code,
      openInstall,
      back,
      Update,
      installStatus,
    };
  },
});
</script>


<style lang="scss" scoped>
.list {
  padding: 24px 32px;
  text-align: left;
  overflow-y: auto;
  .detail-wrap {
    height: 580px !important;
  }
}
.back {
  height: 36px;
  line-height: 36px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;

  opacity: 0.5;
  img {
    height: 36px;
    width: 36px;
    float: left;
    margin-right: 8px;
    cursor: pointer;
  }
}
.detail-wrap {
  @include container;
  height: 100%;
  margin: 0 auto;
  padding-right: 10px;
  padding-bottom: 80px;
  @include scrollBar;
  .detail-top {
    @include flex(space-between, flex-start);
    margin: 24px 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .left {
      flex-grow: 1;
      @include flex(flex-start, flex-start);
      margin-right: 0px;
      .icon {
        flex-shrink: 0;
        margin-right: 16px;
        width: 60px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.1);
      }
      .info {
        @include flex(flex-start, flex-start, column);
        .name {
          max-width: 100%;
          height: 19px;
          line-height: 19px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          @include ellipsis;
          span + span {
            margin-left: 4px;
          }
        }
        .description {
          margin: 4px 0 4px;
          font-size: 12px;
          line-height: 16px;
          color: rgba(255, 255, 255, 0.3);
          text-align: left;
        }
        .bottom {
          @include flex(flex-start);
          height: 16px;
        }
      }
    }
    .right {
      flex-shrink: 0;
      @include flex;
      button {
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
      .install {
        border: 1px solid #ffffff;
        box-sizing: border-box;
        box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
        border-radius: 4px;
        color: #fff;
        position: relative;
        width: 78px;
        padding-left: 17px;
        img {
          width: 12px;
          height: 12px;
          position: absolute;
          left: 7px;
          top: 10px;
        }
      }
      .Update {
        background: #ffffff;
        box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        color: #683eff;
        width: 76px;
        text-align: center;
        padding-left: 0;
      }
    }
  }
  .detail-code {
    text-align: left;
    color: #c6ccd7;
    word-wrap: break-word;
    line-height: 1.6;
    ul:not(.is-structureList) {
      margin-top: 1em;
      margin-bottom: 1em;
      overflow: hidden;
    }
    ul,
    li {
      list-style: disc;
    }
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }
  }
}
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
</style>

