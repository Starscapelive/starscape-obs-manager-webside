<template>
  <div class="item">
    <p class="title">{{ title }}</p>
    <div>
      <span>{{ url }}</span>
      <span @click="modify">Browse</span>
    </div>
  </div>
</template>

<script lang="ts">
// import listVue from '@/views/pluginList/list.vue'
import { defineComponent, reactive, ref } from "vue";
import { openMsgbox } from "@/components/message";
export default defineComponent({
  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  components: {
    //  listVue
  },
  setup(props, context) {
    const modify = () => {
      console.log("调用obsPathModify");

      window.obsPathModify().then((res) => {
        console.log(res);
        if(res.code===0){
          context.emit("update", res.data);
        } else {
           openMsgbox({
                    title: "xxx",
                    msg: res.message,
                    yes: "Got  It",
                    yesFn: () => {
                      console.log("queding");
                     
                    },
                    cancelFn: () => {
                      
                 
                    },
                  });
        }
        
      });
    };
    

    return {
      modify,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 24px;
  .title {
    color: #fff;
    text-align: left;
    margin-bottom: 8px;
  }
  div {
    display: flex;
    text-align: left;

    span:nth-of-type(1) {
      border: 2px solid #3f3a59;
      box-sizing: border-box;
      border-radius: 4px;
      width: 329px;
      height: 32px;
      display: inline-block;
      line-height: 32px;
      color: #9a95aa;
      font-size: 12px;
      padding-left: 12px;
    }
    span:nth-of-type(2) {
      width: 61px;
      height: 32px;
      left: 481px;
      display: inline-block;
      background: #514A5F;
      border-radius: 4px;
      text-align: center;
      color: #fff;
      line-height: 32px;
      margin-left: 8px;
      cursor: pointer;
      font-size: 10px;
    }
  }
}
</style>
