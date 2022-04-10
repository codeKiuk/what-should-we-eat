<template>
  <div class=".container">
    <button class="random-menu" @click="handleRollingMenus">
      <span v-if="!state.menuName">랜덤 메뉴 추천!</span>
      <span v-else>{{ state.menuName }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { randomMenus } from "@/assets/constants/constants";
import { reactive } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { getRandomNum } from "@/hooks/useRandomMenu";

const limit = randomMenus.length;

const state = reactive({
  rolling: false,
  menuName: "",
});

onMounted(() => {
  state.menuName = "";
});

const stop = watchEffect(() => {
  loop();
});

async function loop() {
  while (state.rolling) {
    const newMenu = await rollMenus();
    state.menuName = newMenu as string;
  }
}

function rollMenus() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(randomMenus[getRandomNum(0, limit - 1)]);
    }, 100)
  );
}

const handleRollingMenus = () => {
  state.rolling = !state.rolling;
};
</script>

<style lang="scss" scoped>
@import "@/styles/button.scss";
@import "@/styles/layout.scss";
@import "@/styles/color.scss";

button {
  @include button;
}
.random-menu {
  width: 200px;
  height: 40px;

  @include mainGreenFont;
}
</style>
