<template>
  <div>
    <header>
      <nav>
        <router-link to="/">What Should We Eat ?</router-link>
      </nav>
      <Login />
    </header>
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Home from "./views/home/index.vue";
import Login from "./views/login/index.vue";

export default defineComponent({
  data() {
    return {};
  },
  methods: {},
  components: { Home, Login },
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
