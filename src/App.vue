<template>
  <header>
    <nav>
      <router-link to="/home">What Should We Eat ?</router-link>
    </nav>
  </header>

  <Suspense>
    <template #default>
      <router-view />
    </template>

    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
