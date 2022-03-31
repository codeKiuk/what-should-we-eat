<template>
  <h3>Login</h3>
  <main>
    <button type="text" @click="login"></button>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import googleLogin from "../../firebase/auth";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  methods: {
    async login() {
      const res = await googleLogin();

      if (res.error) {
        this.$store.commit("setLoggedIn", false);
        return;
      }

      this.$router.replace("home");
      this.$store.commit("setLoggedIn", true);
      this.$store.commit("setCurrentUser", res.currentUser);
    },
  },
});
</script>

<style lang="scss" scoped></style>
