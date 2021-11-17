<template>
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
            <plugin-tags :tags="item.tags" style="margin-left: 16px;" />
          </div>
        </div>
      </div>
      <div class="right">
        <Install :info="item" />
      </div>
    </div>
    <div class="detail-code" v-html="code"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import pluginData from './pluginData.vue'
import pluginTags from './pluginTags.vue'
import Install from './pluginInstall.vue'
import { myPlugins } from '@/scripts/util'
import { pluginDetail, detailCode } from '@/scripts/mock'
import { get, post } from '@/scripts/axios'
import iconDefault from '@/assets/images/icon-default.png'

export default defineComponent({
  components: {
    pluginData,
    pluginTags,
    Install
  },
  setup() {
    console.log(myPlugins.value)
    const item = ref(null)
    const code = ref('')
    const $route = useRoute()
    const id = ref('')

    onActivated(() => {
      id.value = $route.query.id as string
      item.value = null
      code.value = ''
      post('/obs/getPluginDetails', {
        id: id.value
      }).then((res: any) => {
        if (!res || !res.data) return
        const { description, tags } = res.data
        item.value = {
          ...res.data,
          icon: item.icon || iconDefault,
          tags: tags || []
        }
        code.value = description.replace(new RegExp(' href=', 'gm'), ' target="blank" href=')
      })
    })

    // get('/v1/login/check_login', {
    //   gameBoxLoginId: false
    // }).then(res => {
    //   console.log(res)
    // })

    // const code = detailCode.replace(new RegExp('<a href=', 'gm'), '<a target="blank" href=')

    return {
      id,
      item,
      code,
    }
  },
})
</script>


<style lang="scss" scoped>
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
      margin-right: 100px;
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
    }
  }
  .detail-code {
    text-align: left;
    color: #c6ccd7;
    word-wrap: break-word;
    line-height: 1.6;
    padding: 0 10px;
    ul:not(.is-structureList) {
      margin-top: 1em;
      margin-bottom: 1em;
      overflow: hidden;
    }
    ul, li {
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
</style>
