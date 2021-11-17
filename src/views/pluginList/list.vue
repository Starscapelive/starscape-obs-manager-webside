<template>
  <div class="plugin-list">
    <div class="filter-wrap">
      <div class="obs-input">
        <el-input
          v-model="searchVal"
          placeholder="Search"
          :clearable="!!searchVal"
          :disabled="loading"
          @clear="changePage(1)"
          @change="changePage(1)"
        />
      </div>
      <el-select
        v-model="platformSect"
        class="obs-select obs-select__platform"
        popper-class="obs-select-dropdown"
        :disabled="loading"
        @change="changePage(1)">
        <el-option
          v-for="item in platformOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        v-model="sortSect"
        class="obs-select obs-select__sort"
        popper-class="obs-select-dropdown"
        :disabled="loading"
        @change="changePage(1)">
        <el-option
          v-for="item in sortOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div
      ref="listWrap"
      class="list-wrap"
      :style="{ overflowY: loading ? 'hidden' : 'auto' }"
    >
      <div v-show="loading" class="obs-loading">
        <Loading />
      </div>
      <div v-show="!loading && noResult" class="no-result">No result</div>
      <div v-show="!noResult" class="list-item" v-for="item in listComputed" :key="item.id">
        <Card
          :item="item"
          @card-click="$emit('card-click', $event)"
        />
      </div>
      <div v-show="!noResult" class="obs-pagination">
        <el-pagination
          layout="prev, pager, next"
          hide-on-single-page
          :disabled="loading"
          :page-size="pageSize"
          :current-page="pageNow"
          :total="pageTotal"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, onMounted } from 'vue'
import Card from './card.vue'
import { platformOpts, sortOpts } from './options'
import { pluginItem } from '@/scripts/mock'
import { myPlugins } from '@/scripts/util'
import { get, post } from '@/scripts/axios'
import Loading from '../pluginDetail/pluginLoading.vue'
import iconDefault from '@/assets/images/icon-default.png'

export default defineComponent({
  components: {
    Card,
    Loading,
  },
  setup(props) {
    const listWrap = ref(null)
    const list = ref(
      JSON.parse(localStorage.getItem("discoverList"))||[]
      
      )
    const loading = ref(false)
    const searchVal = ref('')
    const platformSect = ref(0)
    const sortSect = ref(2)
    const pageNow = ref(1)
    const pageTotal = ref(0)
    const pageSize = 20
    const inited = ref(false)

    const getList = () => {
      loading.value = true
      if (listWrap.value) {
        listWrap.value.scrollTo(0, 0)
      }
      post('/obs/searchPlugin', {
        obsVersion: '',
        name: searchVal.value,
        platform: platformSect.value,
        sortBy: sortSect.value,
        offset: (pageNow.value - 1) * pageSize,
        limit: pageSize,
      }).then((res: any) => {
        loading.value = false
        if (!res) return
        const { data, code } = res
        if (!data || !data.items || code !== 0) return
        pageTotal.value = data.totalCnt;
        
        list.value = data.items.map(item => ({
          ...item,
          icon: item.icon || iconDefault,
          tags: item.tags || [],
        }))
        localStorage.setItem("discoverList",JSON.stringify(list.value))
        inited.value = true
      }).catch(() => {
        loading.value = false
      })
    }
    getList()

    const listComputed = computed(() => {
      const myPluginsIds = []
      const installingIds = []
      myPlugins.value.forEach(item => {
        myPluginsIds.push(item.id)
        if (item.installing) {
          installingIds.push(item.id)
        }
      })
      return list.value.map(item => ({
        ...item,
        isInstalling: installingIds.includes(item.id),
        isInstalled: myPluginsIds.includes(item.id)
      }))
    })

    const changePage = (val) => {
      pageNow.value = val
      getList()
    }

    const noResult = computed(() => {
      return inited.value && !listComputed.value.length
    })
    
    return {
      listWrap,
      list,
      listComputed,
      noResult,
      loading,
      platformOpts,
      sortOpts,
      platformSect,
      sortSect,
      searchVal,
      pageNow,
      pageTotal,
      pageSize,
      getList,
      changePage,
    }
  },
})
</script>

<style lang="scss" scoped>
.plugin-list {
  @include flex(flex-start, stretch, column);
  overflow: hidden;
  width: 100%;
  height: 100%;
  .filter-wrap {
    @include flex(flex-start);
    width: 100%;
    padding: 9px 50px 9px 0;
    font-size: 14px;
    .obs-input {
      flex-grow: 1;
      @include obsSelectIcon('search');
    }
    .obs-select {
      margin-left: 8px;
      &__platform {
        @include obsSelectIcon('filter');
      }
      &__sort {
        @include obsSelectIcon('sort');
      }
    }
  }
  .list-wrap {
    position: relative;
    padding: 7px 0 92px 0;
    @include scrollBar;
    min-height: 100%;
    .list-item {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 0 44px 8px 0;
    }
    .obs-pagination {
      padding-right: 50px;
      text-align: right;
    }
    .no-result {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: #FFFFFF;
      opacity: 0.8;
      margin: 134px auto 0;
    }
  }
  .obs-loading {
    @include flex;
    position: absolute;
    z-index: 20;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
