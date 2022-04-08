<template>
  <main>
    <button type="text" @click="login">Google Login</button>
  </main>
</template>

<script setup lang="ts">
import googleLogin from "../../firebase/auth";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

async function login() {
  const res = await googleLogin();

  if (res.error) {
    return;
  }

  store.dispatch("UserStore/setCurrentUser", res.currentUser);
  router.replace("home");
}
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
