<template>
  <div class="container">
    <button class="add-menu">땡기는 메뉴가 없다면?</button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "@/styles/button.scss";
@import "@/styles/layout.scss";

.container {
  @include column-center;
  justify-content: center;

  width: 100%;

  .add-menu {
    @include button;

    width: 200px;
    height: 40px;
  }
}
</style>
