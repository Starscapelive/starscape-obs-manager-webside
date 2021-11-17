<template>
  <div class="card-wrap" @click="$emit('card-click', item)">
    <div class="left">
      <div v-if="item.icon" class="icon">
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
        <plugin-tags v-if="item.tags.length" class="tags" :tags="item.tags" />
      </div>
    </div>
    <div class="right">
      <div class="data">
        <plugin-data :item="item" :reverse="true" />
      </div>
      <Install  :info="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pluginData from '../pluginDetail/pluginData.vue'
import pluginTags from '../pluginDetail/pluginTags.vue'
import Install from '../pluginDetail/pluginInstall.vue'

export default defineComponent({
  components: {
    pluginData,
    pluginTags,
    Install,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 0
        }
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
.card-wrap {
  @include flex(space-between, stretch);
  overflow: hidden;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
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
      background-color: #231F2C;
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
          color: #85828B;
          font-size: 12px;
        }
        .author {
          font-size: 12px;
        }
      }
      .description {
        margin-top: 4px;
        font-weight: normal;
        font-size: 12px;
        width: 100%;
        line-height: 16px;
        color: #74727A;
        @include ellipsis;
      }
      .tags {
        margin-top: 8px;
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
  }
}
</style>
