<template>
  <button type="button" @click="login"></button>
</template>

<script>
import { defineComponent } from "vue";
import googleLogin from "../../firebase/auth";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  methods: {
    login() {
      googleLogin();
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  width: 50px;
  height: 20px;
}
</style>
