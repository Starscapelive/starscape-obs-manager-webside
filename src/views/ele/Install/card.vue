<template>
  <div @click="toPluginDetail(item)" class="card-wrap">
    <div class="left">
      <div class="icon">
        <img :src="item.icon" />
      </div>
      <div class="info">
        <div class="top">
          <span class="name">{{ item.name }}</span>
          <span class="version">{{ item.version }}</span>
          <span class="by">by</span>
          <span class="author">{{ item.author }}</span>
        </div>
        <div class="description">{{ item.resume }}</div>
        <div class="tags">
          <div class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="test">{{ item.pluginAlias }}</div> -->

    <div class="right">
      <div class="data">
        <plugin-data :item="item" :reverse="true" />
      </div>
      <div class="buttons">
        <div @click.stop="false" v-if="item.loading" class="button-loading">
          <Loading />
        </div>
        <button v-else
          @click.stop="Update(item)"
          class="install"
          :class="item.needUpdate ? 'Update' : ''"
        >
          <img src="../../../assets/images/obs/right.png" alt="" srcset="" />
          {{ item.needUpdate ? "Update" : "Installed" }}
        </button>
        <span @click.stop="deleteItem(item)" class="delete"> </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "../../pluginDetail/pluginLoading.vue";
import { PluginItem } from "@/scripts/interface";
import { useRouter } from "vue-router";
import pluginData from "../../pluginDetail/pluginData.vue";
import { openMsgbox } from "../../../components/message";
import { obsCheckRunning } from "@/scripts/obsutils";
import { myPlugins } from "@/scripts/util";
import { UpdateObs, RemoveObs } from "@/scripts/obsutils";
export default defineComponent({
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  components: {
    pluginData,
    Loading
  },
  setup(props, context) {
    const $router = useRouter();
    const Update = (info) => {
      console.log(info.needUpdate);
      console.log(info.loading);
      
      if (!info.needUpdate || info.loading) {
        return;
      }
      let  myList = [...myPlugins.value]
      myList.forEach(item=>{
        console.log(item.id);
        console.log(info.id);
        
        
        if(item.id===info.id){
           item.loading = true
        }
       
      })
      

      myPlugins.value = myList ;
       window.mixpanel.track('Click Update plugin',{
         "pluginId":info.id,
         "pluginName":info.name
       });
      UpdateObs(info).then((res) => {
        window.mixpanel.track('Update Plugin',{
          "pluginId":info.id,
          "pluginName":info.name
        });
        context.emit("uplist",info.id);
        console.log("112222");
      }).catch(res=>{
          context.emit("uplist",info.id);
      });
    };
    const deleteItem = (info) => {
      window.mixpanel.track('Click Uninstall plugin',{
        "pluginId":info.id,
        "pluginName":info.name
      }); 
      RemoveObs(info).then((res) => {
        window.mixpanel.track('Uninstall plugin',{
        "pluginId":info.id,
        "pluginName":info.name
      });
        context.emit("uplist",info.id);
      });
    };
    const toPluginDetail = ({ id, isInstalled }: PluginItem) => {
      if (!id) return;
      $router.push(
        `/ele-detail?id=${id}&isinstalled=${
          isInstalled ? 1 : 0
        }&router=ele-install`
      );
    };

    return {
      toPluginDetail,
      deleteItem,
      Update,
    };
  },
});
</script>

<style lang="scss" scoped>
.test {
  position: absolute;
  right: 180px;
  bottom: 20px;
  width: 200px;
}
.card-wrap {
  @include flex(space-between, stretch);
  overflow: hidden;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 904px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .left {
    flex-grow: 1;

    @include flex(flex-start);
    overflow: hidden;
    .icon {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #231f2c;
    }
    .info {
      @include flex(flex-start, flex-start, column);
      overflow: hidden;
      text-align: left;
      margin: 0 100px 0 16px;
      .top {
        @include flex(flex-start, flex-end);
        max-width: 100%;
        height: 20px;
        overflow: hidden;
        color: #fff;
        font-size: 16px;
        .name {
          @include ellipsis;
        }
        .version {
          margin-left: 4px;
        }
        .by {
          margin: 0 4px;
          color: #85828b;
          font-size: 12px;
        }
        .author {
          font-size: 12px;
        }
      }
      .description {
        margin: 6px 0 8px;
        font-weight: normal;
        font-size: 12px;
        width: 100%;
        line-height: 16px;
        color: #74727a;
        @include ellipsis;
      }
      .tags {
        @include flex(flex-start);
        @include obsInfosIcon("tag");
        .tag {
          background: #4f427c;
          opacity: 0.5;
          border: 1px solid #9172ff;
          padding: 0 6px;
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
          line-height: 14px;
          white-space: nowrap;
          + .tag {
            margin-left: 4px;
          }
        }
      }
    }
  }
  .right {
    flex-shrink: 0;
    @include flex(space-between, flex-end, column);
    .data {
      @include flex(center, center, row-reverse);
      height: 16px;
    }

    .buttons {
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
    .delete {
      height: 32px;
      width: 32px;
      cursor: pointer;
      margin-left: 8px;
      border-radius: 50%;
      background-size: 16px 16px;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("../../../assets/images/obs/delete.png");
      &:hover {
        background-color: #433f4a;
        background-image: url("../../../assets/images/obs/dh.png");
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
  }
}
</style>
