<template>
  <div class="tags">
    <div class="tag" v-for="tag in tags" :key="tag">{{ tag }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tags: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  setup() {
    return {
    }
  },
})
</script>

<style lang="scss" scoped>
.tags {
  @include flex(flex-start);
  @include obsInfosIcon('tag');
  .tag {
    background: #4F427C;
    opacity: 0.5;
    border: 1px solid #9172FF;
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
</style>
