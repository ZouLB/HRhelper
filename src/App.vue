<template>
  <div id="app">
    <transition name='fade' mode="out-in">
    	<router-view class="child-view"></router-view>
    </transition>
   </div>
</template>

<script>
	
	export default {
	  name: 'App',
	  components: {
	  	
	  }
	}
</script>

<style lang="scss">

	/*@import "src/assets/scss/animation.scss";*/
	@import "src/assets/scss/style.scss";
	
</style>
