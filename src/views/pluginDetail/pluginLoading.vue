<template>
  <div class="loading-wrap">
    <img src="@/assets/images/icon-loading.png" alt="">
  </div>
</template>

<style lang="scss" scoped>
.loading-wrap {
  width: 20px;
  height: 20px;
 
  
  animation: loading 1.04s ease infinite;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

@keyframes loading {
  0% { transform: rotate(0);}
  100% { transform: rotate(360deg);}
}
</style>
