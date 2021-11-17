<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" />
        </router-link>
      </div>
      <div class="nav-wrap">
        <router-link to="/">Download App</router-link>
        <router-link to="/">Events</router-link>
        <router-link to="/">Invites</router-link>
        <router-link to="/">FAQ</router-link>
        <div v-show="showUser" class="header-login"></div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showUser: {
      type: Boolean,
      default: false
    }
  },
})
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  background: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  .container {
    @include flex(space-between);
    @include container;
    position: relative;
    height: $layout-header;
    margin: 0 auto;
  }
  .logo {
    img {
      display: block;
      width: auto;
      height: 52px;
    }
  }
  .nav-wrap {
    @include flex;
    height: 100%;
    font-size: 18px;
    a {
      margin-right: 24px;
      color: #020001;
      text-decoration: none;
      &:hover {
        color: $color-link;
      }
    }
    .header-login {
      align-self: flex-start;
      @include flex;
    }
  }
}
</style>
