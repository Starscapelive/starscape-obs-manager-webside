<template>
  <div class="downloads" :style="{ marginLeft: reverse ? '16px' : '0' }">
    {{ item.downloads }}
  </div>
  <div class="time" :style="{ marginLeft: reverse ? '0' : '16px' }">
    {{ timeFormat(item.lastUpdateTime) }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { timeFormat } from '@/scripts/util'

export default defineComponent({
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 0
        }
      },
      required: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      timeFormat
    }
  },
})
</script>

<style lang="scss" scoped>
.downloads, .time {
  @include flex(flex-start);
  font-family: 'os';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.downloads {
  @include obsInfosIcon('download');
}
.time {
  @include obsInfosIcon('time');
}
</style>
