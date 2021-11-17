<template>
  <div class="list">
    <p>Discover</p>
    <listVue
      @btn-click="btnClick"
      @card-click="toPluginDetail"
      :myPlugins="list.myPlugin"
      ref="listData"
    >
    </listVue>
  </div>
</template>

<script lang="ts">
import listVue from "@/views/pluginList/list.vue";
import { defineComponent, reactive, ref, onMounted } from "vue";
import { PluginItem } from "@/scripts/interface";
import { useRouter } from "vue-router";
import { myPlugins } from "@/scripts/util";

export default defineComponent({
  components: {
    listVue,
  },
  setup() {
     window.mixpanel.track('More plugin page Visit');
    const $router = useRouter();
    const btnClick = (event) => {
      console.log(event);
      if (event.isInstalled) {
        return;
      }

      console.log(list.myPlugin);
    };
    const toPluginDetail = ({ id, isInstalled }: PluginItem) => {
      if (!id) return;
      $router.push(
        `/ele-detail?id=${id}&isinstalled=${
          isInstalled ? 1 : 0
        }&router=ele-list`
      );
    };
    window.obsPluginGet().then((res) => {
      console.log("打开listobsPluginGet");
      console.log(res.data);

      list.myPlugin = res.data;
      myPlugins.value = res.data;
    });
    let list = reactive({
      myPlugin: [],
    });

    return {
      list,
      btnClick,
      toPluginDetail,
    };
  },
  watch: {
    aaaa: {
      handler(newName, oldName) {
        //特别注意，不能用箭头函数，箭头函数，this指向全局
        console.log("obj.a changed");
      },
      immediate: true, //刷新加载 立马触发一次handler
      deep: true, // 可以深度检测到 obj 对象的属性值的变化
    },
    // listData(value){
    //   console.log(value);
    //   console.log("jjj");

    // }
  },
});
</script>

<style lang="scss" scoped>
.list {
  padding: 24px 32px 0;
  p {
    color: #fff;
    font-size: 32px;
    line-height: 38px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
}
.plugin-list {
  height: 590px !important;
}
</style>
