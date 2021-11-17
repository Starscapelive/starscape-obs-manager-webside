<template>
  <aside>
    <ul>
      <li>
        
        <router-link :class="$route.query.router ==='ele-list' || $route.path==='/ele-list'?'active':''"    to="/ele-list">
          <el-tooltip  content="Discover" placement="right">
              <img  src="../../assets/images/obs/fx.png" alt="" srcset="">
          </el-tooltip>
        
        </router-link>
        <span></span>
        <router-link :class="  $route.query.router ==='ele-install' || $route.path==='/ele-install'?'active':''"  to="/ele-install">
          <el-tooltip content="My plugins" placement="right">
         <img src="../../assets/images/obs/install.png" alt="" srcset="">
          </el-tooltip>
        </router-link>
      </li>
      <li>
        <a target="_blank" href="https://discord.gg/prMz6vZfWd">
            <el-tooltip content="Discord Support" placement="right">
        <img class="question" src="../../assets/images/obs/q.png" alt="" srcset="">
        </el-tooltip>
        </a>
      <router-link :class=" $route.path==='/ele-setting'?'active':''" to="/ele-setting">
      <el-tooltip content="Options" placement="right">
       <img src="../../assets/images/obs/set.png" alt="" srcset="">
        </el-tooltip>
     </router-link>
      </li>
     
    </ul>
  </aside>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'


export default defineComponent({
  setup() {
    
    return {
    }
  },
})
</script>

<style lang="scss" scoped>
aside {
  flex-shrink: 0;
  width: 56px;
  height: 668px;
  background: #312C3E;
  color: #fff;
  ul{
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    height: 100%;
    padding: 24px 0;
    .logo{
      width: 52px;
      height: 44px;
    }
    a{
      display: block;
      height: 40px;
      width: 48px;
      line-height: 40px;
      margin: 0 auto;
      border-radius: 4px;
      color: #fff;
      text-decoration: none;
      flex-direction: column;
      display: flex;
      justify-content: center;
      &.active{
        background: #564D6A;;
      }
      img{
        display: block;
        margin: 0 auto;
        width: 24px;
       
      }
    }
  }
}
</style>