<template>
  <!-- <div class="nodata" ></div> -->
  <div class="installed">
    <p>Settings</p>
    <div class="set">
      <SetItemVue
        @update="setPath"
        :title="setConfig[0].title"
        :url="dataConfig.path[setConfig[0].context]"
      />
    </div>
  </div>
</template>

<script lang="ts">
// import listVue from '@/views/pluginList/list.vue'
import { defineComponent, reactive, ref } from "vue";
import SetItemVue from "./com/SetItem.vue";

import { obsPathGet } from "../../../scripts/obsutils";

export default {
  components: {
    SetItemVue,
  },
  setup() {
    const setConfig = [
      {
        title: "Please Set OBS's Root Path, Such as C:/Program Files/obs-studio",
        context: "obsRoot",
      },
    ];
    let dataConfig: any = reactive({
      path: {},
    });
    window.obsPathGet().then((res) => {
      console.log("obsPathGet");
      console.log(res);
      // res.data.obsRoot = "xxxx";
      dataConfig.path = res.data;
      console.log(dataConfig);
    });
    const setPath = (data) => {
      console.log("setPath");
      console.log(data);

      dataConfig.path = data;
    };

    return {
      setConfig,
      dataConfig,
      obsPathGet,
      setPath,
    };
  },
};
</script>

<style lang="scss" scoped>
.installed {
  padding-left: 32px;
  padding-top: 24px;
  P {
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    /* Grayscale/白色 */

    color: #ffffff;
  }
}
.set {
  width: 543px;
  height: 216px;
  left: 120px;

  /* Grayscale/灰色2 */

  background: #393541;
  border-radius: 4px;
  padding: 24px;
}
</style>
