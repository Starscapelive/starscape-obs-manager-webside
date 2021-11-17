<template>
  <!-- <Header /> -->
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <!-- <Footer /> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Header from './Header.vue'
import Aside from './Aside.vue'
import Footer from './Footer.vue'
import { myPlugins } from '@/scripts/util'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Aside,
    Footer
  },
  setup() {
    console.log('layout setup')

    onMounted(() => {
      // setTimeout(() => {
      //   myPlugins.value = [{id: "616f8a5a8189134e58354285"}]

      //   myPlugins.value.push(...[{
      //     id: "616f8a658189134e58354287",
      //     installing: true
      //   }, {
      //     id: "616f8a6c8189134e58354288",
      //     installing: true
      //   }])

      //   setTimeout(() => {
      //     myPlugins.value[1].installing = false

      //     myPlugins.value[2] = {
      //       id: "616f8a6c8189134e58354288",
      //     }
      //   }, 2000)
      // }, 1000)
    })
  },
})
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  overflow: hidden;
}
</style>
