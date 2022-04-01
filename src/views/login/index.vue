<template>
  <main>
    <button type="text" @click="login">Google Login</button>
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
        this.$store.commit("UserStore/setLoggedIn", false);
        return;
      }

      this.$router.replace("home");
      this.$store.commit("UserStore/setLoggedIn", true);
      this.$store.commit("UserStore/setCurrentUser", res.currentUser);
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  all: unset;

  padding: 10px;
  margin: 0 10px;
  font-weight: bold;

  border: 1px solid whitesmoke;
  border-radius: 10px;
  box-shadow: whitesmoke 1px 2px 1px 0px;
  min-width: 100px;
  min-height: 30px;

  &:hover {
    cursor: pointer;
  }
}
</style>
