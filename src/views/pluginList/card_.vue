<template>
  <div class="card-wrap">
    <div class="top">
      <div class="icon">
        <img :src="item.icon" />
      </div>
      <div class="data">
        <p>{{ item.downloads }}</p>
        <p>Installs</p>
      </div>
    </div>
    <div class="info">
      <div class="name">{{ item.name }} {{ item.version }}</div>
      <div class="description">{{ item.resume }}</div>
    </div>
    <div class="time">
      {{ timeFormat(item.lastUpdateTime) }}
    </div>
    <div class="bottom">
      <div class="author">
        <div class="avatar">
          <img src="" />
        </div>
        <div class="name">{{ item.author }}</div>
      </div>
      <div class="install">
        <button>Install</button>
      </div>
    </div>
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
        return {}
      },
      required: true
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
.card-wrap {
  @include flex(space-between, stretch, column);
  height: 234px;
  overflow: hidden;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .top {
    flex-shrink: 0;
    @include flex(space-between, flex-start);
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
    }
    .data {
      margin-top: 5px;
      p {
        font-family: 'os';
        font-style: normal;
        text-align: right;
        &:nth-child(1) {
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          color: #9172FF;
        }
        &:nth-child(2) {
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .info {
    flex-shrink: 0;
    font-family: 'os';
    font-style: normal;
    text-align: left;
    .name {
      margin: 8px 0 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #FFFFFF;
    }
    .description {
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: rgba(255, 255, 255, 0.3);
      @include ellipsis(2);
    }
  }
  .time {
    flex-grow: 1;
    @include flex(flex-start);
    font-family: 'os';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    &::before {
      content: '';
      position: relative;
      width: 12px;
      height: 12px;
      background-image: url(@/assets/images/icon-time.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin-right: 4px;
    }
  }
  .bottom {
    flex-shrink: 0;
    @include flex(space-between);
    .author {
      @include flex(flex-start);
      overflow: hidden;
      .avatar {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        overflow: hidden;
      }
      .name {
        margin-left: 4px;
        font-size: 12px;
        line-height: 16px;
        color: rgba(255, 255, 255, 0.4);
        @include ellipsis;
      }
    }
    .install {
      flex-shrink: 0;
      width: 76px;
      height: 32px;
      button {
        width: 100%;
        height: 100%;
        background: #683EFF;
        box-shadow: 0px 2px 5px rgba(14, 19, 47, 0.2);
        border-radius: 4px;
        line-height: 32px;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
}
</style>
